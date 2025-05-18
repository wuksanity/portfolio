import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortraitureView.css';

// Example: You can edit/add coordinates as you wish!
const portraitPhotos = [
  { id: 1, src: '/assets/borgar.JPG', alt: 'Portrait 1', x: 100, y: 100, z: 1 },
  { id: 2, src: '/assets/bridge.jpg', alt: 'Portrait 2', x: 400, y: 200, z: 1 },
  { id: 3, src: '/assets/lamp.jpg', alt: 'Portrait 3', x: 200, y: 600, z: 1 },
  { id: 4, src: '/assets/couch.JPG', alt: 'Portrait 4', x: 600, y: 400, z: 1  },
  { id: 5, src: '/assets/field.JPG', alt: 'Portrait 5', x: 1100, y: 300, z: 1 }
];

export default function PortraitureView() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="portraiture-view">
      {/* Fixed Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
      >
        <source src="/videos/vin.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fixed Header */}
      <div className="portraiture-header">
        <button
          className="back-to-main-button"
          onClick={() => navigate(-1)}
        >
          &#8592; back
        </button>
        <h1 className="portraiture-title">portraiture</h1>
      </div>

      <div className="portraiture-scroll">
        <div className="portraiture-canvas">
          {portraitPhotos.map(photo => (
            <img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              className="portrait-photo"
              style={{
                left: photo.x,
                top: photo.y
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}