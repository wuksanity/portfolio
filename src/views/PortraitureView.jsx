import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortraitureView.css';

// Example: You can edit/add coordinates as you wish!
const portraitPhotos = [
  { id: 1, src: '/assets/portraits/box1.JPG', alt: 'Portrait 1', x: 100, y: 100, z: 1 },
  { id: 2, src: '/assets/portraits/box2.JPG', alt: 'Portrait 2', x: 400, y: 200, z: 1 },
  { id: 3, src: '/assets/portraits/phone1.jpg', alt: 'Portrait 3', x: 200, y: 600, z: 1 },
  { id: 4, src: '/assets/portraits/nam1.jpg', alt: 'Portrait 4', x: 600, y: 400, z: 1 },
  { id: 5, src: '/assets/portraits/nam2.jpg', alt: 'Portrait 5', x: 1100, y: 300, z: 1 },
  { id: 6, src: '/assets/portraits/gym1.jpg', alt: 'Portrait 6', x: 300, y: 900, z: 1 },
  { id: 7, src: '/assets/portraits/mop1.jpg', alt: 'Portrait 7', x: 900, y: 700, z: 1 },
  { id: 8, src: '/assets/portraits/mop2.jpg', alt: 'Portrait 8', x: 1200, y: 500, z: 1 },
  { id: 9, src: '/assets/portraits/lamp.jpg', alt: 'Portrait 9', x: 150, y: 1200, z: 1 },
  { id: 10, src: '/assets/portraits/lamp1.jpg', alt: 'Portrait 10', x: 700, y: 1100, z: 1 },
  { id: 11, src: '/assets/portraits/lamp2.jpg', alt: 'Portrait 11', x: 1300, y: 900, z: 1 },
  { id: 12, src: '/assets/portraits/loon1.jpg', alt: 'Portrait 12', x: 500, y: 1300, z: 1 },
  { id: 13, src: '/assets/portraits/loon2.jpg', alt: 'Portrait 13', x: 1000, y: 1200, z: 1 },
  { id: 14, src: '/assets/portraits/loon3.jpg', alt: 'Portrait 14', x: 300, y: 300, z: 1 },
  { id: 15, src: '/assets/portraits/fence1.jpg', alt: 'Portrait 15', x: 800, y: 200, z: 1 },
  { id: 16, src: '/assets/portraits/fence2.jpg', alt: 'Portrait 16', x: 1400, y: 100, z: 1 },
  { id: 17, src: '/assets/portraits/decay1.jpg', alt: 'Portrait 17', x: 1600, y: 600, z: 1 },
  { id: 18, src: '/assets/portraits/decay2.jpg', alt: 'Portrait 18', x: 1700, y: 900, z: 1 },
  { id: 19, src: '/assets/portraits/rus1.jpg', alt: 'Portrait 19', x: 1800, y: 400, z: 1 },
  { id: 20, src: '/assets/portraits/rus2.jpg', alt: 'Portrait 20', x: 1900, y: 1100, z: 1 },
  { id: 21, src: '/assets/portraits/rus3.jpg', alt: 'Portrait 21', x: 100, y: 1500, z: 1 },
  { id: 22, src: '/assets/portraits/fight1.jpg', alt: 'Portrait 22', x: 600, y: 1400, z: 1 },
  { id: 23, src: '/assets/portraits/fight2.jpg', alt: 'Portrait 23', x: 1200, y: 1300, z: 1 },
  { id: 24, src: '/assets/portraits/stop1.jpg', alt: 'Portrait 24', x: 1800, y: 1200, z: 1 },
  { id: 25, src: '/assets/portraits/stop2.jpg', alt: 'Portrait 25', x: 150, y: 1600, z: 1 },
  { id: 26, src: '/assets/portraits/stop3.jpg', alt: 'Portrait 26', x: 700, y: 1500, z: 1 },
  { id: 27, src: '/assets/portraits/blank1.jpg', alt: 'Portrait 27', x: 1300, y: 1400, z: 1 },
  { id: 28, src: '/assets/portraits/shade1.jpg', alt: 'Portrait 28', x: 1900, y: 1300, z: 1 },
  { id: 29, src: '/assets/portraits/shade2.jpg', alt: 'Portrait 29', x: 100, y: 1700, z: 1 },
  { id: 30, src: '/assets/portraits/rah1.jpg', alt: 'Portrait 30', x: 700, y: 1600, z: 1 },
  { id: 31, src: '/assets/portraits/rah2.jpg', alt: 'Portrait 31', x: 1300, y: 1500, z: 1 },
  { id: 32, src: '/assets/portraits/rah3.jpg', alt: 'Portrait 32', x: 1900, y: 1400, z: 1 },
  { id: 33, src: '/assets/portraits/bag1.jpg', alt: 'Portrait 33', x: 100, y: 1800, z: 1 },
  { id: 34, src: '/assets/portraits/bag2.jpg', alt: 'Portrait 34', x: 700, y: 1700, z: 1 },
  { id: 35, src: '/assets/portraits/bubble1.jpg', alt: 'Portrait 35', x: 1300, y: 1600, z: 1 },
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