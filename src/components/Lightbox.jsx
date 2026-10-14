import { useEffect } from 'react';
import { getImage, lightboxSizes } from '../media';
import './Lightbox.css';

// Full-screen view of one photo. Closes on a click outside the photo or on Escape.
export default function Lightbox({ name, alt, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const image = getImage(name);
  if (!image) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          className="lightbox-image"
          sizes={lightboxSizes(image)}
          srcSet={image.srcSet}
          width={image.width}
          height={image.height}
          alt={alt}
          src={image.src}
        />
      </div>
    </div>
  );
}
