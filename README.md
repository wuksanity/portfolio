# walkerriley.com

Personal portfolio: software, photography, and acting/modeling. React 19 + Vite +
React Router, deployed on Vercel.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

## Deploy

Vercel builds and deploys automatically on every push to `main`; pushes to other
branches get preview URLs. `vercel.json`:

- rewrites page URLs to `index.html`, so deep links like `/photography/street`
  survive a refresh (`/assets/*` and `/media/*` are excluded, so a missing file
  is a real 404 rather than the home page);
- caches `/assets/*` (Vite's bundles) and `/media/*` (photos and videos) for a
  year. Both have a content hash in every file name, so a change always gets a
  new URL.

## Photos and videos

`media-originals/` holds the full-resolution masters (gitignored: ~1.9 GB, and
some files are over GitHub's 100 MB limit; back it up separately). Everything
the site serves is generated from it:

```bash
npm run media:install   # once per machine (sharp + ffmpeg, kept out of the site's own dependencies)
npm run media           # rebuilds public/media/ and src/media/manifest.json
```

The script makes WebP files at several widths per photo (the browser downloads
the smallest one that looks sharp on the visitor's screen), re-encodes the
background videos, and writes `public/og-image.jpg` (the link-preview image).
Unchanged originals are skipped, so re-running it is fast. It also lists any
published media that no page uses.

To add a photo: put the original in `media-originals/assets/<folder>/`, run
`npm run media`, then reference it by key, e.g. `<Photo name="street/newshot" … />`
or an entry in a gallery's list. Commit `public/media/` and the manifest.

Pages never reference files in `public/` directly: `src/media/index.js` and
`src/components/Photo.jsx` read the manifest, so a typo in a key fails loudly
in development.
