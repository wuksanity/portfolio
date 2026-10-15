import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import BackButton from "../components/BackButton";
import Photo from "../components/Photo";
import "./Photography.css";

// Hook to enable click-and-drag scrolling with a mouse (touch scrolls natively)
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse') return;
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft + (startX - e.pageX);
    };

    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('dragging');
    };

    // Prevent image dragging while swiping
    const onDragStart = (e) => e.preventDefault();

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    el.addEventListener('dragstart', onDragStart);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('dragstart', onDragStart);
    };
  }, [ref]);
}

const portraitPhotos = [
  { name: 'portraits/shade1', alt: 'Portrait from the shade series' },
  { name: 'portraits/box2', alt: 'Portrait from the box series' },
  { name: 'portraits/bubble1', alt: 'Portrait from the bubble series' },
  { name: 'portraits/loon1', alt: 'Portrait from the loon series' },
  { name: 'portraits/rus3', alt: 'Portrait from the rus series' },
];

const streetPhotos = [
  { name: 'street/loversbynight', alt: 'Street photograph: lovers by night' },
  { name: 'street/buswindow', alt: 'Street photograph: bus window' },
  { name: 'street/girlmen', alt: 'Street photograph: girl and men' },
  { name: 'street/nycsubstrangers', alt: 'Street photograph: NYC subway strangers' },
  { name: 'street/tuniswalk', alt: 'Street photograph: Tunis walk' },
];

const GALLERY_SIZES = "(max-width: 768px) 84vw, 500px";

export default function PhotographyPortfolio() {
  const portraitGalleryRef = useRef(null);
  const streetGalleryRef = useRef(null);
  const navigate = useNavigate();

  useDragScroll(portraitGalleryRef);
  useDragScroll(streetGalleryRef);

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
        <h1 className="portfolio-title">PORTFOLIO</h1>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-grid-container">
            {/* Large Featured Photo on Left with Text */}
            <div className="hero-main-image-wrapper">
              <Photo
                name="portraits/lamp"
                alt="Portrait from the lamp series"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
                className="hero-main-image"
              />
              <div className="hero-text-overlay">
                <div className="hero-text">
                  <h2 className="hero-heading">Capturing Moments</h2>
                  <p className="hero-subheading">A visual journey through human expression and urban landscapes.</p>
                </div>
              </div>
            </div>

            {/* Stacked Photos on Right */}
            <div className="hero-right-column">
              <div className="hero-secondary-image-wrapper">
                <Photo name="street/trafficman" alt="Street photograph: bus" sizes="(max-width: 768px) 48vw, 480px" className="hero-secondary-image" />
              </div>
              <div className="hero-secondary-image-wrapper">
                <Photo name="portraits/rah3" alt="Portrait from the mop series" sizes="(max-width: 768px) 48vw, 480px" className="hero-secondary-image" />
              </div>
            </div>
          </div>
        </div>

        <PhotoStrip
          title="PORTRAITURE"
          to="/photography/portraiture"
          photos={portraitPhotos}
          scrollerRef={portraitGalleryRef}
          onScroll={scrollGallery}
        />
        <PhotoStrip
          title="STREET"
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

  return (
    <div className={`gallery-section ${className}`}>
      <div className="gallery-header">
        <h2 className="gallery-title">{title}</h2>
        <button onClick={() => navigate(to)} className="view-all-button">
          View all <ArrowRight className="view-all-icon" />
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
              onClick={() => navigate(to)}
            >
              <Photo name={photo.name} alt={photo.alt} sizes={GALLERY_SIZES} className="gallery-image" />
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
