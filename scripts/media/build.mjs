// Builds the web-ready media the site serves from the full-resolution masters.
//
//   media-originals/assets/<key>.jpg -> public/media/<key>-<width>.<hash>.webp (one file per width)
//   media-originals/**/<key>.mp4     -> public/media/<key>.<hash>.mp4 + <key>-poster.<hash>.webp
//
// and writes src/media/manifest.json, which the app reads to build srcset/sizes.
// Every output name carries a hash of its contents, so browsers can cache them
// forever (see vercel.json) and a changed photo always gets a new URL.
//
// Run with `npm run media` (once per machine: `npm run media:install`).

import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'

const run = promisify(execFile)
const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const ORIGINALS = join(ROOT, 'media-originals')
const OUT = join(ROOT, 'public', 'media')
const MANIFEST = join(ROOT, 'src', 'media', 'manifest.json')
const CACHE = join(ROOT, 'scripts', 'media', '.cache.json')

// Full-bleed page backgrounds and heroes get wider variants than gallery photos.
const BACKGROUNDS = new Set(['field', 'lotus', 'borgar', 'bridge', 'portraits/lamp'])
const BACKGROUND_WIDTHS = [960, 1600, 2400]
const PHOTO_WIDTHS = [640, 1200, 1800]
const WEBP = { quality: 85, effort: 6, smartSubsample: true }

// Per-photo adjustments, applied before resizing.
const IMAGES = {
  // Delivered printed on white paper: trim the border so the photo fills its grid tile.
  'modeling/spotlight': { trim: 40 },
}

// Background loops always play muted, so their audio is dropped; 30 fps halves the motion data.
const H264 = ['-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p']
const AAC = ['-c:a', 'aac', '-b:a', '128k', '-ac', '2']

// Acting clips keep their sound. The phone screen recordings are cut down to the picture:
// no black bars, no iPhone home indicator, no streaming-app title or timestamp bars.
// `vf`/`af` are ffmpeg filters; `posterAt` is the frame (in seconds) shown before playing.
const acting = ({ vf, af, crf = 23 } = {}) => [...H264, '-crf', String(crf), ...(vf ? ['-vf', vf] : []), ...(af ? ['-af', af] : []), ...AAC]
// Clip 6 spans two episodes; the app's 1.3 s black "episode ended" screen between them is cut.
const EPISODE_BREAK = "not(between(t,37.10,38.42))"

const VIDEOS = {
  'videos/vin': [...H264, '-crf', '28', '-r', '30', '-an'],
  'videos/ocean': [...H264, '-crf', '26', '-r', '30', '-vf', 'scale=1920:-2', '-an'],
  'modeling/lamin': ['-c', 'copy'], // already web-sized; keeps its audio for the on-page controls

  'acting/ganzberg-tvc': { args: acting(), posterAt: 28, posterMax: 1280 },
  'acting/venus-de-saigon-1': { args: acting({ vf: 'crop=1260:852:330:0,fps=30' }), posterAt: 25, posterMax: 1280 },
  'acting/venus-de-saigon-2': { args: acting({ vf: 'crop=1260:852:330:0,fps=30' }), posterAt: 6.5, posterMax: 1280 },
  'acting/oneplus-tvc': { args: acting({ vf: 'crop=1514:852:203:0,fps=30' }), posterAt: 23, posterMax: 1280 },
  'acting/vertical-2': { args: acting({ vf: 'crop=888:1306:0:0,fps=30' }), posterAt: 4.2, posterMax: 1280 },
  'acting/vertical-1': {
    args: acting({
      vf: `fps=30,crop=888:1334:0:286,select='${EPISODE_BREAK}',setpts=N/30/TB`,
      af: `aselect='${EPISODE_BREAK}',asetpts=N/SR/TB`,
    }),
    posterAt: 40.2,
    posterMax: 1280,
  },
  // Recorded sideways in portrait: crop the bars and the player's progress line, then stand it upright.
  'acting/chinsu-tvc': { args: acting({ vf: 'crop=852:1514:36:203,transpose=2,fps=25' }), posterAt: 3.9, posterMax: 1280 },
  // Small, already-compressed sources: a lower CRF so re-encoding doesn't soften them further.
  'acting/wake-campaign': { args: acting({ crf: 21 }), posterAt: 4.2, posterMax: 1280 },
  'acting/asus-tvc': { args: acting({ crf: 21 }), posterAt: 68, posterMax: 1280 },
}
const DEFAULT_VIDEO = [...H264, '-crf', '26', '-vf', "scale='min(1920,iw)':-2", '-c:a', 'aac', '-b:a', '128k']

// Link-preview image for LinkedIn, iMessage, etc. Crawlers want a stable URL and a JPEG.
const SOCIAL = { key: 'field', file: join(ROOT, 'public', 'og-image.jpg'), width: 1200, height: 630 }

const IMAGE_TYPES = new Set(['.jpg', '.jpeg', '.png'])
const VIDEO_TYPES = new Set(['.mp4', '.mov'])

async function main() {
  const cache = await readJson(CACHE, { images: {}, videos: {}, social: null })
  const next = { images: {}, videos: {}, social: null }
  const manifest = { images: {}, videos: {} }
  const sources = new Map()
  const stats = { built: 0, reused: 0 }

  for (const file of await walk(ORIGINALS)) {
    const ext = extname(file).toLowerCase()
    if (!IMAGE_TYPES.has(ext) && !VIDEO_TYPES.has(ext)) {
      console.warn(`skipped ${relative(ROOT, file)}: not an image or video`)
      continue
    }
    const key = keyFor(file)
    if (sources.has(key)) throw new Error(`Two originals map to "${key}": ${relative(ROOT, sources.get(key))} and ${relative(ROOT, file)}`)
    sources.set(key, file)
  }

  const tasks = [...sources].map(([key, file]) => async () => {
    const isVideo = VIDEO_TYPES.has(extname(file).toLowerCase())
    const kind = isVideo ? 'videos' : 'images'
    const settings = isVideo ? VIDEOS[key] ?? DEFAULT_VIDEO : { widths: widthsFor(key), WEBP, ...IMAGES[key] }
    const fingerprint = await fingerprintOf(file, settings)
    const hit = cache[kind][key]
    let entry
    if (hit?.fingerprint === fingerprint && (await outputsExist(hit.entry))) {
      entry = hit.entry
      stats.reused++
    } else {
      entry = isVideo ? await buildVideo(file, key, settings) : await buildImage(file, key, settings)
      stats.built++
      console.log(`built ${key}`)
    }
    manifest[kind][key] = entry
    next[kind][key] = { fingerprint, entry }
  })
  await pool(tasks, 3)

  const socialSource = sources.get(SOCIAL.key)
  const socialPrint = await fingerprintOf(socialSource, SOCIAL)
  if (cache.social !== socialPrint || !(await exists(SOCIAL.file))) {
    await sharp(socialSource).rotate().resize(SOCIAL.width, SOCIAL.height, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(SOCIAL.file)
  }
  next.social = socialPrint

  const removed = await removeStale(manifest)
  await mkdir(dirname(MANIFEST), { recursive: true })
  await writeFile(MANIFEST, JSON.stringify(sortKeys(manifest), null, 2) + '\n')
  await writeFile(CACHE, JSON.stringify(next))

  const bytes = await folderSize(OUT)
  console.log(`\n${Object.keys(manifest.images).length} images, ${Object.keys(manifest.videos).length} videos ` +
    `(${stats.built} built, ${stats.reused} unchanged, ${removed} stale files removed); public/media is ${(bytes / 1048576).toFixed(1)} MB`)
  await reportUnused(manifest)
}

function widthsFor(key) {
  return BACKGROUNDS.has(key) ? BACKGROUND_WIDTHS : PHOTO_WIDTHS
}

async function buildImage(file, key, { widths: targets, trim }) {
  // A trimmed photo is cut once into a lossless intermediate, and every width is made from that.
  const input = trim ? await sharp(file).rotate().trim({ threshold: trim }).png({ compressionLevel: 0 }).toBuffer() : file
  const meta = await sharp(input).metadata()
  // metadata() reports the stored size; EXIF orientations 5-8 are rotated 90 degrees.
  const [srcWidth, srcHeight] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height]
  // Never upscale: drop targets wider than the original and offer the original width instead.
  const widths = targets.filter((w) => w < srcWidth)
  if (widths.length < targets.length) widths.push(srcWidth)

  const sources = []
  for (const width of widths) {
    const { data, info } = await sharp(input).rotate().resize({ width }).webp(WEBP).toBuffer({ resolveWithObject: true })
    const src = await writeHashed(data, `${key}-${width}`, 'webp')
    sources.push({ src, width: info.width, height: info.height })
  }
  const largest = sources[sources.length - 1]
  return { width: largest.width, height: largest.height, sources: sources.map(({ src, width }) => ({ src, width })) }
}

async function buildVideo(file, key, spec) {
  const { args, posterAt = 0, posterMax } = Array.isArray(spec) ? { args: spec } : spec
  const tmp = join(OUT, `${key}.tmp.mp4`)
  await mkdir(dirname(tmp), { recursive: true })
  // +faststart puts the index at the front, so playback can begin before the download ends.
  await run(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', '-i', file, ...args, '-movflags', '+faststart', tmp])
  const video = await readFile(tmp)
  await rm(tmp)
  const src = await writeHashed(video, key, 'mp4')

  const { stdout: frame } = await run(
    ffmpegPath,
    ['-hide_banner', '-loglevel', 'error', '-ss', String(posterAt), '-i', join(ROOT, 'public', src), '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'],
    { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 },
  )
  const { width, height } = await sharp(frame).metadata() // the video's own size, for layout
  let still = sharp(frame)
  if (posterMax) still = still.resize({ width: posterMax, height: posterMax, fit: 'inside', withoutEnlargement: true })
  const poster = await writeHashed(await still.webp({ quality: 80 }).toBuffer(), `${key}-poster`, 'webp')
  return { src, poster, width, height }
}

async function writeHashed(data, name, ext) {
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 8)
  const path = join(OUT, `${name}.${hash}.${ext}`)
  await mkdir(dirname(path), { recursive: true })
  if (!(await exists(path))) await writeFile(path, data)
  return '/' + relative(join(ROOT, 'public'), path).split('\\').join('/')
}

// Delete files in public/media that the new manifest no longer points at.
async function removeStale(manifest) {
  const keep = new Set()
  for (const image of Object.values(manifest.images)) image.sources.forEach((s) => keep.add(s.src))
  for (const video of Object.values(manifest.videos)) keep.add(video.src).add(video.poster)
  let removed = 0
  for (const file of await walk(OUT)) {
    const url = '/' + relative(join(ROOT, 'public'), file).split('\\').join('/')
    if (!keep.has(url)) {
      await rm(file)
      removed++
    }
  }
  return removed
}

// List published media that no page references, so unused originals can be pruned.
async function reportUnused(manifest) {
  const code = (await Promise.all((await walk(join(ROOT, 'src'))).filter((f) => /\.jsx?$/.test(f)).map((f) => readFile(f, 'utf8')))).join('\n')
  const keys = [...Object.keys(manifest.images), ...Object.keys(manifest.videos)]
  const unused = keys.filter((key) => !code.includes(`'${key}'`) && !code.includes(`"${key}"`) && key !== SOCIAL.key)
  if (unused.length) console.log(`Not used by any page (still published): ${unused.join(', ')}`)
}

function keyFor(file) {
  const rel = relative(ORIGINALS, file).split('\\').join('/')
  return rel.replace(/^assets\//, '').replace(/\.[^.]+$/, '')
}

async function fingerprintOf(file, settings) {
  const { size, mtimeMs } = await stat(file)
  return createHash('sha256').update(JSON.stringify([size, Math.round(mtimeMs), settings])).digest('hex').slice(0, 16)
}

async function outputsExist(entry) {
  const urls = entry.sources ? entry.sources.map((s) => s.src) : [entry.src, entry.poster]
  return (await Promise.all(urls.map((u) => exists(join(ROOT, 'public', u))))).every(Boolean)
}

async function walk(dir) {
  if (!(await exists(dir))) return []
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(path)))
    else out.push(path)
  }
  return out.sort()
}

async function folderSize(dir) {
  let total = 0
  for (const file of await walk(dir)) total += (await stat(file)).size
  return total
}

async function pool(tasks, size) {
  const queue = [...tasks]
  await Promise.all(Array.from({ length: size }, async () => {
    while (queue.length) await queue.shift()()
  }))
}

async function exists(path) {
  return stat(path).then(() => true, () => false)
}

async function readJson(path, fallback) {
  return readFile(path, 'utf8').then(JSON.parse, () => fallback)
}

function sortKeys(manifest) {
  const sorted = (obj) => Object.fromEntries(Object.keys(obj).sort().map((k) => [k, obj[k]]))
  return { images: sorted(manifest.images), videos: sorted(manifest.videos) }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
