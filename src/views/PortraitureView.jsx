import React, { useRef } from 'react';
import './PortraitureView.css';

export default function PortraitureView() {
  const videoRef = useRef(null);

  return (
    <div className="portraiture-view">
      {/* Video Background Only */}
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
    </div>
  );
}