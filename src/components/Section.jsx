import React from 'react';
import './Section.css';

function Section({ title, description, backgroundImage, showButton = true, className = '' }) {
  return (
    <section className="section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={`section-content ${className}`}>
        <h2>{title}</h2>
        <p>{description}</p>
        {showButton && <button className="view-more">view more</button>}
      </div>
    </section>
  );
}

export default Section;