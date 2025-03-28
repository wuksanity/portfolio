import React from 'react';
import { Link } from 'react-router-dom';
import './Section.css';

const Section = React.forwardRef(({ 
  title, 
  description, 
  backgroundImage, 
  showButton = true, 
  className = '',
  id // We'll add this new prop
}, ref) => {
  const linkPath = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to path

  return (
    <section 
      id={id}
      ref={ref}
      className={`section ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="section-content">
        <h2>{title}</h2>
        <div>{description}</div> {/* Changed from <p> to <div> to handle multiple paragraphs */}
        {showButton && <Link to={`/${linkPath}`} className="view-more">view more</Link>}
      </div>
    </section>
  );
});

Section.displayName = 'Section'; // For better debugging

export default Section;