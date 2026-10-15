import React from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';
import './Section.css';

const Section = React.forwardRef(({
  title,
  description,
  image, // key in the media manifest, drawn full-bleed behind the content
  priority = false, // true for the first section: its image is the first thing anyone sees
  focus, // where the subject is ("x% y%"), so a phone's narrow crop keeps it in frame
  showButton = true,
  className = '',
  id
}, ref) => {
  const linkPath = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to path

  return (
    <section
      id={id}
      ref={ref}
      className={`section ${className}`}
      style={focus ? { '--focus': focus } : undefined}
    >
      <Photo name={image} alt="" sizes="100vw" priority={priority} className="section-background" />
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
