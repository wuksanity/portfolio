"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./Photography.css";
import { useNavigate } from 'react-router-dom';

// Hook to enable click-and-drag / touch-drag scrolling
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse') return; // Only enable drag scroll for mouse
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX || (e.touches && e.touches[0].pageX);
      scrollLeft = el.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX || (e.touches && e.touches[0].pageX);
      const walk = startX - x; // positive = scroll right
      el.scrollLeft = scrollLeft + walk;
    };

    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('dragging');
    };

    // Use pointer events for mouse & touch
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Prevent image dragging while swiping
    el.addEventListener('dragstart', (e) => e.preventDefault());

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [ref]);
}

export default function PhotographyPortfolio() {
  const [activeSection, setActiveSection] = useState(null);
  const portraitGalleryRef = useRef(null);
  const streetGalleryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useDragScroll(portraitGalleryRef);
  useDragScroll(streetGalleryRef);

  const portraitPhotos = [
    { id: 1, src: '/assets/portraits/shade1.jpg', alt: 'Portrait 1' },
    { id: 2, src: '/assets/portraits/box2.JPG', alt: 'Portrait 2' },
    { id: 3, src: '/assets/portraits/bubble1.jpg', alt: 'Portrait 3' },
    { id: 4, src: '/assets/portraits/loon1.jpg', alt: 'Portrait 4' },
    { id: 5, src: '/assets/portraits/rus3.jpg', alt: 'Portrait 5' }
  ];

  const streetPhotos = [
    { id: 1, src: '/assets/street/loversbynight.jpg', alt: 'Street 1' },
    { id: 2, src: '/assets/street/buswindow.jpg', alt: 'Street 2' },
    { id: 3, src: '/assets/street/girlmen.jpg', alt: 'Street 3' },
    { id: 4, src: '/assets/street/nycsubstrangers.jpg', alt: 'Street 4' },
    { id: 5, src: '/assets/street/tuniswalk.jpg', alt: 'Street 5' }];

  const scrollGallery = (ref, direction) => {
    if (!ref.current) return;
    
    const scrollAmount = 300;
    const currentScroll = ref.current.scrollLeft;
    
    ref.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <main className="photography-portfolio">
      <div className="back-to-main">
        <button 
          onClick={() => window.location.href = '/'}
          className="back-to-main-button"
        >
          <ArrowLeft className="back-icon" />
          take me home
        </button>
      </div>
      {activeSection === null ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="portfolio-container"
        >
          <h1 className="portfolio-title">PORTFOLIO</h1>
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-section"
          >
            <div className="hero-grid-container">
              {/* Large Featured Photo on Left with Text */}
              <motion.div 
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="hero-main-image-wrapper"
              >
                <img 
                  src="/assets/portraits/lamp.jpg" 
                  alt="Featured photography" 
                  className="hero-main-image"
                />
                <div className="hero-text-overlay">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <h2 className="hero-heading">Capturing Moments</h2>
                    <p className="hero-subheading">A visual journey through human expression and urban landscapes.</p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Stacked Photos on Right */}
              <div className="hero-right-column">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hero-secondary-image-wrapper"
                >
                  <img 
                    src="/assets/street/bus.jpg" 
                    alt="Portrait photography" 
                    className="hero-secondary-image"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hero-secondary-image-wrapper"
                >
                  <img 
                    src="/assets/portraits/mop2.jpg" 
                    alt="Street photography" 
                    className="hero-secondary-image"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Portrait Gallery Section */}
          <div className="gallery-section">
            <div className="gallery-header">
              <h2 className="gallery-title"> PORTRAITURE</h2>
              <button 
                onClick={() => navigate('/photography/portraiture')}
                className="view-all-button"
              >
                View all <ArrowRight className="view-all-icon" />
              </button>
            </div>
            
            <div className="gallery-container">
              <button 
                onClick={() => scrollGallery(portraitGalleryRef, "left")}
                className="gallery-nav-button gallery-nav-left"
                aria-label="Scroll left"
              >
                <ArrowLeft className="nav-icon" />
              </button>
              
              <div 
                ref={portraitGalleryRef}
                className="gallery-scroller"
              >
                {portraitPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="gallery-item"
                    onClick={() => navigate('/photography/portraiture')}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={photo.src || "/placeholder.svg"} 
                      alt={photo.alt} 
                      className="gallery-image portrait-image"
                    />
                  </motion.div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollGallery(portraitGalleryRef, "right")}
                className="gallery-nav-button gallery-nav-right"
                aria-label="Scroll right"
              >
                <ArrowRight className="nav-icon" />
              </button>
              
              <div className="mobile-indicators">
                {Array.from({ length: Math.ceil(portraitPhotos.length / 2) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (portraitGalleryRef.current) {
                        portraitGalleryRef.current.scrollLeft = i * portraitGalleryRef.current.offsetWidth;
                      }
                    }}
                    className="indicator-dot"
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Street Gallery Section */}
          <div className="gallery-section street-gallery-container">
            <div className="gallery-header">
              <h2 className="gallery-title">STREET</h2>
              <button 
                onClick={() => navigate('/photography/street')}
                className="view-all-button"
              >
                View all <ArrowRight className="view-all-icon" />
              </button>
            </div>
            
            <div className="gallery-container">
              <button 
                onClick={() => scrollGallery(streetGalleryRef, "left")}
                className="gallery-nav-button gallery-nav-left"
                aria-label="Scroll left"
              >
                <ArrowLeft className="nav-icon" />
              </button>
              
              <div 
                ref={streetGalleryRef}
                className="gallery-scroller"
              >
                {streetPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="gallery-item"
                    onClick={() => navigate('/photography/street')}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={photo.src || "/placeholder.svg"} 
                      alt={photo.alt} 
                      className="gallery-image street-image"
                    />
                  </motion.div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollGallery(streetGalleryRef, "right")}
                className="gallery-nav-button gallery-nav-right"
                aria-label="Scroll right"
              >
                <ArrowRight className="nav-icon" />
              </button>
              
              <div className="mobile-indicators">
                {Array.from({ length: Math.ceil(streetPhotos.length / 2) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (streetGalleryRef.current) {
                        streetGalleryRef.current.scrollLeft = i * streetGalleryRef.current.offsetWidth;
                      }
                    }}
                    className="indicator-dot"
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="category-view"
        >
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setActiveSection(null)}
            className="back-button"
          >
            <ArrowLeft className="back-icon" />
            Back to portfolio
          </motion.button>
          
          <h1 className="category-title">{activeSection}</h1>
          
          <PhotoGrid category={activeSection} />
        </motion.div>
      )}
    </main>
  );
}

function PhotoGrid({ category }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos =
    category === "portraiture"
      ? portraitPhotos
      : streetPhotos;

  const getSpanClass = (index) => {
    if (category === "portraiture") {
      if (index === 0 || index === 3) return "portrait-large";
    } else {
      if (index === 1 || index === 4) return "street-wide";
    }
    return "";
  };

  return (
    <>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`grid-item ${getSpanClass(index)}`}
            onClick={() => setSelectedPhoto(index)}
          >
            <img
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              className={`grid-image ${category === "portraiture" ? "portrait-aspect" : "street-aspect"}`}
            />
          </motion.div>
        ))}
      </div>

      {selectedPhoto !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="photo-modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedPhoto].src || "/placeholder.svg"}
              alt={photos[selectedPhoto].alt}
              className="modal-image"
            />
            <div className="image-caption">
              <p>{photos[selectedPhoto].description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}