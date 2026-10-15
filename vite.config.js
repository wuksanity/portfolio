import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Full-bleed images that are the first thing painted on these routes.
// They must match the <Photo sizes="100vw"> that renders them.
const FIRST_IMAGE_BY_ROUTE = { '/': 'about', '/software': 'bridge' }

// The page is rendered by JavaScript, so the browser can't see the first image
// until the bundle has downloaded and run. This inline script starts fetching
// it as soon as the HTML arrives, picking the same file the <img> will use.
function preloadFirstImage() {
  return {
    name: 'preload-first-image',
    transformIndexHtml() {
      const { images } = JSON.parse(readFileSync(new URL('./src/media/manifest.json', import.meta.url), 'utf8'))
      const srcsets = Object.fromEntries(
        Object.entries(FIRST_IMAGE_BY_ROUTE).map(([route, name]) => [
          route,
          images[name].sources.map((s) => `${s.src} ${s.width}w`).join(', '),
        ])
      )
      const script = `(function (srcsets) {
  var srcset = srcsets[location.pathname.replace(/\\/+$/, '') || '/'];
  if (!srcset) return;
  var link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.setAttribute('imagesrcset', srcset);
  link.setAttribute('imagesizes', '100vw');
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
})(${JSON.stringify(srcsets)});`
      return [{ tag: 'script', children: script, injectTo: 'head' }]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadFirstImage()],
})
