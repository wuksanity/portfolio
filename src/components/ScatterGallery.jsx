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

  const layout = photos.map((photo) => {
    const width = photo.width ?? DEFAULT_PHOTO_WIDTH;
    const image = getImage(photo.name);
    const height = image ? (width * image.height) / image.width : width;
    // Clamp to the canvas, not the window: the canvas is what gets scaled to fit.
    return { ...photo, width, height, left: Math.min(photo.x, CANVAS_WIDTH - width) };
  });
  const canvasHeight = Math.max(...layout.map((p) => p.y + p.height)) + BOTTOM_MARGIN;

  return (
    <div className="scatter-view">
      <BackgroundVideo name={video} />

      <div className="scatter-header">
        <BackButton onClick={goBack} icon={false}>&#8592; back</BackButton>
        <h1 className="scatter-title">{title}</h1>
      </div>

      <div className="scatter-stage" style={{ height: canvasHeight * scale }}>
        <div
          className="scatter-canvas"
          style={{ width: CANVAS_WIDTH, height: canvasHeight, transform: `scale(${scale})` }}
        >
          {layout.map((photo) => (
            <Photo
              key={photo.name}
              name={photo.name}
              alt={photo.alt}
              className="scatter-photo"
              sizes={`(max-width: ${CANVAS_WIDTH}px) ${((photo.width / CANVAS_WIDTH) * 100).toFixed(2)}vw, ${photo.width}px`}
              style={{ left: photo.left, top: photo.y, width: photo.width }}
              onClick={() => setSelected(photo)}
            />
          ))}
        </div>
      </div>

      {selected && <Lightbox name={selected.name} alt={selected.alt} onClose={closeLightbox} />}
    </div>
  );
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
