import { getImage } from '../media';

// A responsive <img> for an image in the media manifest. The browser picks the
// smallest file that fills `sizes`. Lazy by default; pass `priority` for the
// image that paints first on a page.
export default function Photo({ name, sizes, alt, priority = false, ...rest }) {
  const image = getImage(name);
  if (!image) return null;

  // loading, sizes and srcSet come before src: some browsers start fetching as
  // soon as src is set, before they know the image is lazy or responsive.
  return (
    <img
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      sizes={sizes}
      srcSet={image.srcSet}
      width={image.width}
      height={image.height}
      alt={alt}
      {...rest}
      src={image.src}
    />
  );
}
