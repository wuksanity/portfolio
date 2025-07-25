import React from 'react';
import { useState } from "react"
import { Play, ArrowLeft } from "lucide-react"
import "./ActingModeling.css"

function ActingModeling() {
  const [activeTab, setActiveTab] = useState("modeling")

  return (
    <div className="page-container">
      {/* Take me home button */}
      <div className="back-to-main">
        <button 
          onClick={() => window.location.href = '/'}
          className="back-to-main-button"
        >
          <ArrowLeft className="back-icon" />
          take me home
        </button>
      </div>
      {/* Navigation */}
      <nav className="main-navigation">
        <div className="tab-buttons-container">
          <button
            onClick={() => setActiveTab("modeling")}
            className={`tab-button ${activeTab === "modeling" ? "active-tab" : "inactive-tab"}`}
          >
            MODELING
          </button>
          <button
            onClick={() => setActiveTab("acting")}
            className={`tab-button ${activeTab === "acting" ? "active-tab" : "inactive-tab"}`}
          >
            ACTING
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="content-container">
        {activeTab === "modeling" ? <ModelingTab /> : <ActingTab />}
      </div>
    </div>
  )
}

function ModelingTab() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src, alt) => setSelectedImage({ src, alt });
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="modeling-container">
      {/* Artistic Grid Layout */}
      <div className="modeling-grid">
        {/* Large portrait image */}
        <div className="grid-item portrait-large" onClick={() => openImage('/assets/modeling/tank2.jpeg','Portrait modeling shot')}>
          <img
            src="/assets/modeling/tank2.jpeg"
            alt="Portrait modeling shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Medium landscape image */}
        <div className="grid-item landscape-medium" onClick={() => openImage('/assets/modeling/jean5.jpeg','Fashion modeling shot')}>
          <img
            src="/assets/modeling/jean5.jpeg"
            alt="Fashion modeling shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Video reel (non-clickable) */}
        <div className="grid-item video-placeholder">
          <div className="video-content">
            <video
              src="/assets/modeling/lamin.mp4"
              autoPlay
              loop
              muted
              controls
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
            <p className="video-label">VIDEO REEL</p>
          </div>
        </div>

        {/* Small square images */}
        <div className="grid-item square-small" onClick={() => openImage('/assets/modeling/wake1.jpeg','Editorial shot')}>
          <img
            src="/assets/modeling/wake1.jpeg"
            alt="Editorial shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        <div className="grid-item square-small" onClick={() => openImage('/assets/modeling/wake2.jpeg','Beauty shot')}>
          <img
            src="/assets/modeling/wake2.jpeg"
            alt="Beauty shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Wide landscape image */}
        <div className="grid-item landscape-wide" onClick={() => openImage('/assets/modeling/lamin3.jpeg','Campaign shot')}>
          <img
            src="/assets/modeling/lamin3.jpeg"
            alt="Campaign shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Another video space (placeholder) */}
        <div className="grid-item video-small">
          <div className="video-content">
            <div className="small-play-button-container">
              <Play className="small-play-icon" />
            </div>
            <p className="small-video-label">BEHIND SCENES</p>
          </div>
        </div>

        {/* Tall portrait */}
        <div className="grid-item portrait-tall" onClick={() => openImage('/assets/modeling/lamin1.jpeg','Studio portrait')}>
          <img
            src="/assets/modeling/lamin1.jpeg"
            alt="Studio portrait"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Medium square */}
        <div className="grid-item square-medium" onClick={() => openImage('/assets/modeling/lamin2.jpeg','Artistic shot')}>
          <img
            src="/assets/modeling/lamin2.jpeg"
            alt="Artistic shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Small images */}
        <div className="grid-item square-small" onClick={() => openImage('/assets/modeling/red1.jpeg','Detail shot')}>
          <img
            src="/assets/modeling/red1.jpeg"
            alt="Detail shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>

        <div className="grid-item landscape-small" onClick={() => openImage('/assets/modeling/jean2.jpeg','Lifestyle shot')}>
          <img
            src="/assets/modeling/jean2.jpeg"
            alt="Lifestyle shot"
            className="grid-image"
          />
          <div className="image-overlay" />
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="photo-modal" onClick={closeImage}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}

function ActingTab() {
  return (
    <div className="acting-container">
      <div className="acting-content">
        <h2 className="acting-title">UNDER CONSTRUCTION</h2>
        <div className="acting-divider"></div>
        <p className="acting-message">Coming Soon</p>
      </div>
    </div>
  )
}

export default ActingModeling; 