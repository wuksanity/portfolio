import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StreetView.css';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

// Example: You can edit/add coordinates as you wish!
const portraitPhotos = [
  { id: 1, src: '/assets/street/age1.jpg', alt: 'Portrait 1', x: 100, y: 150, z: 1 },
  { id: 2, src: '/assets/street/age2.jpg', alt: 'Portrait 2', x: 800, y: 350, z: 1, width: 600 },
  { id: 3, src: '/assets/street/age3.jpg', alt: 'Portrait 3', x: 200, y: 700, z: 1 },
  { id: 4, src: '/assets/street/age4.jpg', alt: 'Portrait 4', x: 600, y: 1100, z: 1, width: 600 },
  { id: 5, src: '/assets/street/manwoman1.jpg', alt: 'Portrait 5', x: 1000, y: 1600, z: 1 },
  { id: 6, src: '/assets/street/manwoman2.jpg', alt: 'Portrait 6', x: 150, y: 1700, z: 1 },
  { id: 7, src: '/assets/street/men1.JPG', alt: 'Portrait 7', x: 300, y: 2100, z: 1 },
  { id: 8, src: '/assets/street/men2.jpg', alt: 'Portrait 8', x: 900, y: 2400, z: 1, width: 600 },
  { id: 9, src: '/assets/street/men3.jpg', alt: 'Portrait 9', x: 150, y: 2700, z: 1 },
  { id: 10, src: '/assets/street/men4.jpg', alt: 'Portrait 10', x: 700, y: 3000, z: 1 },
  { id: 11, src: '/assets/street/men5.jpg', alt: 'Portrait 11', x: 1000, y: 3370, z: 1 },
  { id: 12, src: '/assets/street/men6.jpg', alt: 'Portrait 12', x: 130, y: 3400, z: 1 },
  { id: 13, src: '/assets/street/men7.jpg', alt: 'Portrait 13', x: 800, y: 3900, z: 1, width: 400 },
  { id: 14, src: '/assets/street/men8.jpg', alt: 'Portrait 14', x: 50, y: 4200, z: 1 },
  { id: 15, src: '/assets/street/men9.jpg', alt: 'Portrait 15', x: 400, y: 4700, z: 1 },
  { id: 16, src: '/assets/street/metal1.jpg', alt: 'Portrait 16', x: 1400, y: 4800, z: 1 },
  { id: 17, src: '/assets/street/metal2.jpg', alt: 'Portrait 17', x: 200, y: 5200, z: 1 },
  { id: 18, src: '/assets/street/mother1.jpg', alt: 'Portrait 18', x: 300, y: 5850, z: 1 },
  { id: 19, src: '/assets/street/mother2.jpg', alt: 'Portrait 19', x: 950, y: 6000, z: 1 },
  { id: 20, src: '/assets/street/mother3.jpg', alt: 'Portrait 20', x: 100, y: 6300, z: 1 },
  { id: 21, src: '/assets/street/mother4.jpg', alt: 'Portrait 21', x: 650, y: 6600, z: 1 },
  { id: 22, src: '/assets/street/mother5.jpg', alt: 'Portrait 22', x: 400, y: 7000, z: 1 },
  { id: 23, src: '/assets/street/nyc1.jpg', alt: 'Portrait 23', x: 150, y: 7500, z: 1 },
  { id: 24, src: '/assets/street/nyc2.jpg', alt: 'Portrait 24', x: 700, y: 7800, z: 1 },
  { id: 25, src: '/assets/street/nyc3.jpg', alt: 'Portrait 25', x: 130, y: 8170, z: 1 },
  { id: 26, src: '/assets/street/nyc4.jpg', alt: 'Portrait 26', x: 999, y: 8400, z: 1 },
  { id: 27, src: '/assets/street/nyc5.jpg', alt: 'Portrait 27', x: 100, y: 8700, z: 1 },
  { id: 28, src: '/assets/street/nyc6.jpg', alt: 'Portrait 28', x: 700, y: 9000, z: 1 },
  { id: 29, src: '/assets/street/nyc7.jpg', alt: 'Portrait 29', x: 990, y: 9500, z: 1 },
  { id: 30, src: '/assets/street/scene1.jpg', alt: 'Portrait 30', x: 190, y: 9600, z: 1 },
  { id: 31, src: '/assets/street/scene2.jpg', alt: 'Portrait 31', x: 100, y: 10000, z: 1 },
  { id: 32, src: '/assets/street/scene3.jpg', alt: 'Portrait 32', x: 800, y: 10200, z: 1 },
  { id: 33, src: '/assets/street/scene4.jpg', alt: 'Portrait 33', x: 50, y: 10500, z: 1 },
  { id: 34, src: '/assets/street/scene5.jpg', alt: 'Portrait 34', x: 400, y: 10800, z: 1 },
  { id: 35, src: '/assets/street/scene6.jpg', alt: 'Portrait 35', x: 1400, y: 11100, z: 1 },
  { id: 36, src: '/assets/street/scene7.jpg', alt: 'Portrait 36', x: 200, y: 11500, z: 1 },
  { id: 37, src: '/assets/street/scene8.jpg', alt: 'Portrait 37', x: 900, y: 11800, z: 1 },
  { id: 38, src: '/assets/street/tun1.jpg', alt: 'Portrait 38', x: 300, y: 12200, z: 1 },
  { id: 39, src: '/assets/street/tun2.jpg', alt: 'Portrait 39', x: 950, y: 12500, z: 1 },
  { id: 40, src: '/assets/street/us1.jpg', alt: 'Portrait 40', x: 100, y: 12800, z: 1 },
  { id: 41, src: '/assets/street/us2.jpg', alt: 'Portrait 41', x: 700, y: 13100, z: 1 },
  { id: 42, src: '/assets/street/vendor1.jpg', alt: 'Portrait 42', x: 130, y: 13400, z: 1 },
  { id: 43, src: '/assets/street/vendor2.jpg', alt: 'Portrait 43', x: 999, y: 13700, z: 1 },
  { id: 44, src: '/assets/street/vendor3.jpg', alt: 'Portrait 44', x: 100, y: 14000, z: 1 },
  { id: 45, src: '/assets/street/vendor4.jpg', alt: 'Portrait 45', x: 700, y: 14300, z: 1 },
  { id: 46, src: '/assets/street/window1.jpg', alt: 'Portrait 46', x: 130, y: 14600, z: 1 }
];

export default function StreetView() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  return (
    <div className="street-view">
      {/* Fixed Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
      >
        <source src="/videos/ocean.mp4" type="video/mp4" />
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
        <h1 className="portraiture-title">street (observations of existence)</h1>
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
                left: Math.min(photo.x, windowWidth - (photo.width || 500)),
                top: photo.y,
                width: photo.width ? `${photo.width}px` : '500px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}