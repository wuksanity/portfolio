import React from 'react';
import './Header.css';
import { FaInstagram, FaEnvelope, FaTiktok, FaGithub } from 'react-icons/fa';

function Header({ scrollToSection, sectionRefs, onContactClick }) {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li><button onClick={() => scrollToSection(sectionRefs.aboutRef)}>about walker riley</button></li>
          <li><button onClick={() => scrollToSection(sectionRefs.softwareRef)}>software</button></li>
          <li><button onClick={() => scrollToSection(sectionRefs.photographyRef)}>photography</button></li>
          <li><button onClick={() => scrollToSection(sectionRefs.actingModelingRef)}>acting/modeling</button></li>
          <li><button className="contact-button" onClick={onContactClick}>contact</button></li>
        </ul>
        <div className="social-icons">
          <a href="https://www.instagram.com/myfirstnameiswalker/" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={{ cursor: 'pointer' }} />
          </a>
          <a href="mailto:walkerriley315@gmail.com" style={{ cursor: 'pointer' }}>
            <FaEnvelope />
          </a>
          <a href="https://www.tiktok.com/@wuksanity" target="_blank" rel="noopener noreferrer">
            <FaTiktok style={{ cursor: 'pointer' }} />
          </a>
          <a href="https://github.com/wuksanity" target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ cursor: 'pointer' }} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;