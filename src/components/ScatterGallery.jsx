import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import Lightbox from './Lightbox';
import Photo from './Photo';
import { getImage, getVideo } from '../media';
import './ScatterGallery.css';

const CANVAS_WIDTH = 1500; // design width of the layout; narrower windows scale the canvas down
const DEFAULT_PHOTO_WIDTH = 500;
const BOTTOM_MARGIN = 80;

// Photos placed freely on a tall canvas over a looping background video.
// Each photo is { name, alt, x, y, width? } in canvas pixels.
export default function ScatterGallery({ title, video, photos, backTo }) {
  const windowWidth = useWindowWidth();
  const scale = Math.min(1, windowWidth / CANVAS_WIDTH);
  const [selected, setSelected] = useState(null);
  const closeLightbox = useCallback(() => setSelected(null), []);
  const goBack = useGoBack(backTo);

  const layout = phoneLayout(
    photos.map((photo) => {
      const width = photo.width ?? DEFAULT_PHOTO_WIDTH;
      const image = getImage(photo.name);
      const height = image ? (width * image.height) / image.width : width;
      // Clamp to the canvas, not the window: the canvas is what gets scaled to fit.
      return { ...photo, width, height, left: Math.min(photo.x, CANVAS_WIDTH - width) };
    })
  );
  const canvasHeight = Math.max(...layout.map((p) => p.y + p.height)) + BOTTOM_MARGIN;

  return (
    <div className="scatter-view">
      <BackgroundVideo name={video} />

      <div className="scatter-header">
        <BackButton onClick={goBack} icon={false}>&#8592; back</BackButton>
        <h1 className="scatter-title">{title}</h1>
      </div>

      <div className="scatter-stage" style={{ '--stage-height': `${canvasHeight * scale}px` }}>
        <div
          className="scatter-canvas"
          style={{ '--canvas-width': `${CANVAS_WIDTH}px`, '--canvas-height': `${canvasHeight}px`, '--scale': scale }}
        >
          {layout.map((photo) => (
            <Photo
              key={photo.name}
              name={photo.name}
              alt={photo.alt}
              className="scatter-photo"
              sizes={`(max-width: 640px) ${photo.phoneWidth}vw, (max-width: ${CANVAS_WIDTH}px) ${((photo.width / CANVAS_WIDTH) * 100).toFixed(2)}vw, ${photo.width}px`}
              style={{
                '--x': `${photo.left}px`,
                '--y': `${photo.y}px`,
                '--w': `${photo.width}px`,
                '--phone-width': `${photo.phoneWidth}%`,
                '--phone-x': `${photo.phoneX}%`,
                '--phone-gap': photo.phoneGap,
              }}
              onClick={() => setSelected(photo)}
            />
          ))}
        </div>
      </div>

      {selected && <Lightbox name={selected.name} alt={selected.alt} onClose={closeLightbox} />}
    </div>
  );
}

// On phones the canvas becomes one column of large prints. Each keeps the character of its
// desktop placement: wider photos stay wider, and a photo on the left or right of the canvas
// sits on that side. Photos that sat side by side on desktop overlap slightly, like prints
// laid on a table; the rest get breathing room.
function phoneLayout(photos) {
  return photos.map((photo, i) => {
    const portrait = photo.height > photo.width;
    const phoneWidth = Math.round(({ 400: 70, 500: 80, 600: 92 }[photo.width] ?? 80) * (portrait ? 0.8 : 1));
    const center = photo.left + photo.width / 2;
    const side = center < 600 ? 'left' : center > 900 ? 'right' : 'center';
    const nudge = (i * 37) % 5; // a small, stable irregularity so edges don't line up
    const phoneX = side === 'left' ? nudge : side === 'right' ? 100 - phoneWidth - nudge : (100 - phoneWidth) / 2;

    const prev = photos[i - 1];
    let phoneGap = '0px';
    if (prev) {
      const prevCenter = prev.left + prev.width / 2;
      const prevSide = prevCenter < 600 ? 'left' : prevCenter > 900 ? 'right' : 'center';
      const besideOnDesktop = photo.y < prev.y + prev.height; // they shared a row on the canvas
      phoneGap = besideOnDesktop && side !== prevSide && side !== 'center' && prevSide !== 'center' ? '-7vw' : `${6 + ((i * 53) % 5)}vw`;
    }
    return { ...photo, side, phoneWidth, phoneX, phoneGap };
  });
}

// Visitors who ask for less motion or less data get the still poster instead.
function BackgroundVideo({ name }) {
  const [playVideo] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData
  );
  const clip = getVideo(name);
  if (!clip) return null;
  if (!playVideo) return <img className="scatter-video" src={clip.poster} alt="" />;
  return <video className="scatter-video" src={clip.src} poster={clip.poster} autoPlay loop muted playsInline />;
}

// Go back within the site, or to `fallback` when this page was opened directly
// (going back from a direct visit would leave the site).
function useGoBack(fallback) {
  const navigate = useNavigate();
  const location = useLocation();
  return () => (location.key === 'default' ? navigate(fallback) : navigate(-1));
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}
