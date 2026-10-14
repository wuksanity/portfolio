import manifest from './manifest.json'

// Images and videos are generated from media-originals/ by `npm run media`.
// Look them up by key: their path under media-originals/assets without the
// extension, e.g. 'portraits/lamp' or 'videos/vin'.

export function getImage(name) {
  const image = manifest.images[name]
  if (!image) return missing('image', name)
  return {
    src: image.sources[image.sources.length - 1].src,
    srcSet: image.sources.map((s) => `${s.src} ${s.width}w`).join(', '),
    width: image.width,
    height: image.height,
  }
}

export function getVideo(name) {
  return manifest.videos[name] ?? missing('video', name)
}

// `sizes` for a photo shown as large as fits in 90vw x 80vh (the lightbox):
// height-limited on screens wider than the photo's shape, width-limited otherwise.
export function lightboxSizes({ width, height }) {
  return `(min-aspect-ratio: ${width * 8}/${height * 9}) calc(80vh * ${(width / height).toFixed(4)}), 90vw`
}

function missing(kind, name) {
  const message = `Unknown ${kind} "${name}": add it to media-originals/ and run npm run media`
  if (import.meta.env.DEV) throw new Error(message)
  console.error(message)
  return null
}
