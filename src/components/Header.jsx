import React from 'react';
import './Header.css';
import { FaInstagram, FaEnvelope, FaTiktok, FaGithub } from 'react-icons/fa';

function Header({ scrollToSection, sectionRefs }) {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li><button onClick={() => scrollToSection(sectionRefs.aboutRef)}>about walker riley</button></li>
          <li><button onClick={() => scrollToSection(sectionRefs.softwareRef)}>software</button></li>
          <li><button onClick={() => scrollToSection(sectionRefs.photographyRef)}>photography</button></li>
          <li><button onClick={() => scrollToSection(sectionRefs.actingModelingRef)}>acting/modeling</button></li>
          <li><button className="contact-button">contact</button></li>
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