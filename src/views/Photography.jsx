import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import BackButton from "../components/BackButton";
import Photo from "../components/Photo";
import "./Photography.css";

// Pixels a mouse must travel before a press counts as a drag rather than a click
const DRAG_THRESHOLD = 6;

// Hook to enable click-and-drag scrolling with a mouse (touch scrolls natively).
// A drag only scrolls; the click the browser sends on release is swallowed, so it never opens a photo.
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pointerId = null; // the mouse pointer currently pressed on the strip
    let dragged = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      pointerId = e.pointerId;
      dragged = false;
      el.classList.add('dragging');
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;
      e.preventDefault();
      const dx = startX - e.pageX;
      el.scrollLeft = scrollLeft + dx;
      if (!dragged && Math.abs(dx) > DRAG_THRESHOLD) {
        dragged = true;
        // Keep this pointer's events coming to the strip even if it leaves the strip or the page.
        el.setPointerCapture(e.pointerId);
      }
    };

    // A drag ends on release, or if the browser takes the pointer away mid-drag (pointercancel).
    const onPointerEnd = (e) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      el.classList.remove('dragging');
    };

    // Releasing a drag still produces a click; stop it before it reaches the photo's onClick
    const onClickCapture = (e) => {
      if (!dragged) return;
      dragged = false;
      e.stopPropagation();
    };

    // Backstop for browsers that ignore draggable={false} on the photos
    const onDragStart = (e) => e.preventDefault();

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerEnd);
    window.addEventListener('pointercancel', onPointerEnd);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('dragstart', onDragStart);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('dragstart', onDragStart);
    };
  }, [ref]);
}

const portraitPhotos = [
  { name: 'portraits/hole1', alt: 'Portrait from the shade series' },
  { name: 'portraits/box2', alt: 'Portrait from the box series' },
  { name: 'portraits/bubble1', alt: 'Portrait from the bubble series' },
  { name: 'portraits/loon3', alt: 'Portrait from the loon series' },
  { name: 'portraits/mop1', alt: 'Portrait from the rus series' },
];

const streetPhotos = [
  { name: 'street/loversbynight', alt: 'Street photograph: lovers by night' },
  { name: 'street/buswindow', alt: 'Street photograph: bus window' },
  { name: 'street/girlmen', alt: 'Street photograph: girl and men' },
  { name: 'street/nycsubstrangers', alt: 'Street photograph: NYC subway strangers' },
  { name: 'street/trafficman', alt: 'Street photograph: Tunis walk' },
];

const GALLERY_SIZES = "(max-width: 768px) 84vw, 500px";

export default function PhotographyPortfolio() {
  const portraitGalleryRef = useRef(null);
  const streetGalleryRef = useRef(null);
  const navigate = useNavigate();

  const scrollGallery = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = 300;
    ref.current.scrollTo({
      left: ref.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
      behavior: "smooth"
    });
  };

  return (
    <div className="photography-portfolio">
      <BackButton onClick={() => navigate('/')} className="back-button-fixed">
        take me home
      </BackButton>

      <div className="portfolio-container">
        <h1 className="portfolio-title">portfolio</h1>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-grid-container">
            {/* Large Featured Photo on Left with Text */}
            <div className="hero-main-image-wrapper">
              <Photo
                name="portraits/rope1"
                alt="Portrait from the mop series"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
                className="hero-main-image"
              />
              <div className="hero-text-overlay">
                <div className="hero-text">
                  <h2 className="hero-heading">a visual meditation of sorts</h2>
                  <p className="hero-subheading">and a few lenses with which to see through my eyes.</p>
                </div>
              </div>
            </div>

            {/* Stacked Photos on Right */}
            <div className="hero-right-column">
              <div className="hero-secondary-image-wrapper">
                <Photo name="street/sunsetfree" alt="Street photograph: traffic man" sizes="(max-width: 768px) 48vw, 480px" className="hero-secondary-image" />
              </div>
              <div className="hero-secondary-image-wrapper">
                <Photo name="portraits/shade2" alt="Portrait from the loon series" sizes="(max-width: 768px) 48vw, 480px" className="hero-secondary-image" />
              </div>
            </div>
          </div>
        </div>

        <PhotoStrip
          title="people i have come to know"
          to="/photography/portraiture"
          photos={portraitPhotos}
          scrollerRef={portraitGalleryRef}
          onScroll={scrollGallery}
        />
        <PhotoStrip
          title="people i have yet"
          to="/photography/street"
          photos={streetPhotos}
          scrollerRef={streetGalleryRef}
          onScroll={scrollGallery}
          className="street-gallery-container"
        />
      </div>
    </div>
  );
}

// A titled, horizontally scrolling row of photos linking to the full gallery.
function PhotoStrip({ title, to, photos, scrollerRef, onScroll, className = "" }) {
  const navigate = useNavigate();
  const openGallery = () => navigate(to);
  useDragScroll(scrollerRef);

  return (
    <div className={`gallery-section ${className}`}>
      <div className="gallery-header">
        <h2 className="gallery-title">{title}</h2>
        <button onClick={openGallery} className="view-all-button">
          view all <ArrowRight className="view-all-icon" />
        </button>
      </div>

      <div className="gallery-container">
        <button
          onClick={() => onScroll(scrollerRef, "left")}
          className="gallery-nav-button gallery-nav-left"
          aria-label="Scroll left"
        >
          <ArrowLeft className="nav-icon" />
        </button>

        <div ref={scrollerRef} className="gallery-scroller">
          {photos.map((photo, index) => (
            <div
              key={photo.name}
              className="gallery-item"
              style={{ '--i': index }}
              onClick={openGallery}
            >
              <Photo name={photo.name} alt={photo.alt} sizes={GALLERY_SIZES} className="gallery-image" draggable={false} />
            </div>
          ))}
        </div>

        <button
          onClick={() => onScroll(scrollerRef, "right")}
          className="gallery-nav-button gallery-nav-right"
          aria-label="Scroll right"
        >
          <ArrowRight className="nav-icon" />
        </button>

        <div className="mobile-indicators">
          {Array.from({ length: Math.ceil(photos.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollerRef.current) {
                  scrollerRef.current.scrollLeft = i * scrollerRef.current.offsetWidth;
                }
              }}
              className="indicator-dot"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
