import React from 'react';
import './Section.css';

function Section({ title, description, backgroundImage }) {
  return (
    <section className="section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="section-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="view-more">View More</button>
      </div>
    </section>
  );
}

export default Section;