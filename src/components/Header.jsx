import React, { useState } from 'react';
import './Header.css';
import { FaInstagram, FaEnvelope, FaTiktok, FaGithub } from 'react-icons/fa';

function Header({ scrollToSection, sectionRefs, onContactClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (ref) => {
    if (ref) scrollToSection(ref);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
          <li><button onClick={() => handleNavClick(sectionRefs.aboutRef)}>about walker riley</button></li>
          <li><button onClick={() => handleNavClick(sectionRefs.softwareRef)}>software</button></li>
          <li><button onClick={() => handleNavClick(sectionRefs.photographyRef)}>photography</button></li>
          <li><button onClick={() => handleNavClick(sectionRefs.actingModelingRef)}>acting/modeling</button></li>
          <li><button className="contact-button" onClick={() => { setIsMenuOpen(false); onContactClick(); }}>contact</button></li>
        </ul>
        <div className="social-icons">
          <a href="https://www.instagram.com/myfirstnameiswalker/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram style={{ cursor: 'pointer' }} />
          </a>
          <a href="mailto:walkerriley315@gmail.com" style={{ cursor: 'pointer' }} aria-label="Email">
            <FaEnvelope />
          </a>
          <a href="https://www.tiktok.com/@wuksanity" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <FaTiktok style={{ cursor: 'pointer' }} />
          </a>
          <a href="https://github.com/wuksanity" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub style={{ cursor: 'pointer' }} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;