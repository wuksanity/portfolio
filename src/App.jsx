import React, { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Section from './components/Section';
import Software from './views/Software';
import Photography from './views/Photography';
import ActingModeling from './views/ActingModeling';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const aboutRef = useRef(null);
  const softwareRef = useRef(null);
  const photographyRef = useRef(null);
  const actingModelingRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Header 
        scrollToSection={scrollToSection}
        sectionRefs={{ aboutRef, softwareRef, photographyRef, actingModelingRef }}
        onContactClick={togglePopup} // Pass the toggle function
      />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Section 
                ref={aboutRef}
                title="walker riley" 
                description="software engineer. photographer. actor. model. human being." 
                backgroundImage="src/assets/field.jpg" 
                showButton={false}
                className="first-section-content"
              />
              <Section 
                ref={softwareRef}
                title="software" 
                description={
                  <>
                    <p>Walker Riley is a versatile software engineer with a strong focus on artificial intelligence, machine learning, and full-stack development.</p>
                    <p>With experience refining AI models at DataAnnotationTech, he specialized in natural language processing and prompt engineering, meticulously debugging code-related responses to enhance model accuracy and reliability.</p>
                    <p>His work at Arch Capital Group further solidified his machine learning expertise, where he engineered a Python-based OCR clustering model with 99% accuracy to automate insurance document processing, leveraging Microsoft Azure for optimization.</p>
                    <p>Beyond AI, Walker thrives as a builder—architecting and developing adayinthelife.ink, a full-stack social media journal app using React and Firebase, where he tackled authentication, real-time data, and system design from the ground up.</p>
                    <p>A graduate of The Ohio State University with a BS in Computer Science & Engineering (and a minor in Mathematics), he combines technical rigor in Python, Java, and JavaScript with a problem-solving mindset, constantly iterating to improve codebases and user experiences.</p>
                    <p>Open to remote opportunities, Walker is passionate about creating impactful software at the intersection of data, AI, and clean, functional design.</p>
                  </>
                } 
                backgroundImage="src/assets/lotus.jpg" 
              />
              <Section 
                ref={photographyRef}
                title="photography" 
                description={
                  <>
                    <p>I don't just take pictures—I hunt for the cracks in reality. The unguarded moments. The quiet chaos. My lens is drawn to the stories etched in faces, the tension in empty streets, the raw, unfiltered truth that most people walk right past.</p>
                    <p>This is conceptual portraiture with teeth. Street photography with a pulse. Every frame is a confrontation—with myself, with the subject, with the world. I don't just observe; I dissect. Light, shadow, texture—they're all weapons in the war against the mundane.</p>
                    <p>I shoot like a programmer debugging the human condition: obsessive, iterative, ruthless in the pursuit of something real. The camera is my scalpel. The darkroom (or Lightroom) is my lab. The result? Images that don't just sit there—they grab you by the throat and demand a reaction.</p>
                    <p>Creative direction? It's not about control. It's about controlled chaos. I build worlds, then set them on fire. I coax vulnerability out of strangers, then freeze it in time. Every shoot is a tightrope walk between intention and accident.</p>
                    <p>This isn't just photography. It's an exorcism.</p>
                  </>
                }
                backgroundImage="src/assets/lamp.jpg" 
              />
              <Section 
                ref={actingModelingRef}
                title="acting-modeling" 
                description={
                  <>
                    <p>Driven by a passion for authentic storytelling, I bring depth and versatility to every role—both on screen and in front of the lens.</p>
                    <p>As an actor, I've had the privilege of portraying a lead character in a short film and delivering nuanced performances in supporting roles for two drama series, honing my craft through collaboration and a commitment to emotional truth.</p>
                    <p>My extensive background work has further sharpened my ability to enhance scenes with intention, even without dialogue.</p>
                    <p>As a model, I specialize in creative photoshoots and look books, where I work closely with photographers and designers to bring their artistic visions to life.</p>
                    <p>With a strong understanding of composition, movement, and expression, I adapt seamlessly to diverse styles—whether high-fashion editorial, commercial storytelling, or experimental concepts.</p>
                    <p>Rooted in discipline and creative curiosity, I approach every project with professionalism and a collaborative spirit, always striving to elevate the work.</p>
                  </>
                }
                backgroundImage="src/assets/borgar.jpg"
              />
            </>
          } />
          <Route path="/software" element={<Software />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/acting-modeling" element={<ActingModeling />} />
        </Routes>
      </main>
      {showPopup && (
        <div className="popup">
          <p>It's in the corner! didn't you see it, silly?</p>
          <button onClick={togglePopup}>ope</button>
        </div>
      )}
    </>
  );
}

export default App;