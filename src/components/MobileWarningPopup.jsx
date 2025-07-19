import React from 'react';
import './MobileWarningPopup.css';

export default function MobileWarningPopup({ onClose }) {
  return (
    <div className="mobile-warning-overlay" onClick={onClose}>
      <div className="mobile-warning-window" onClick={(e) => e.stopPropagation()}>
        <p className="mobile-warning-text">
          This site is not fully optimised for mobile viewing. For the best experience, please switch to a desktop browser.
        </p>
        <button className="mobile-warning-btn" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
} 