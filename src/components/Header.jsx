import React from 'react';
import './Header.css'; // Create this CSS file for header-specific styles
import { FaInstagram, FaEnvelope, FaTiktok, FaGithub } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li>about Walker Riley</li>
          <li>software</li>
          <li>photography</li>
          <li>acting/modeling</li>
          <li>contact</li>
        </ul>
        <div className="social-icons">
          <FaInstagram />
          <FaEnvelope />
          <FaTiktok />
          <FaGithub />
        </div>
      </nav>
    </header>
  );
}

export default Header; 