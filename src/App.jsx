import React, { useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Section from './components/Section';
import Software from './views/Software';
import Photography from './views/Photography';
import ActingModeling from './views/ActingModeling';
import PortraitureView from './views/PortraitureView';
import StreetView from './views/StreetView';
import './App.css';

function App() {
  const location = useLocation();
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
      {/* Conditionally render the Header based on the current path */}
      {location.pathname === '/' && (
        <Header 
          scrollToSection={scrollToSection}
          sectionRefs={{ aboutRef, softwareRef, photographyRef, actingModelingRef }}
          onContactClick={togglePopup} // Pass the toggle function
        />
      )}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Section 
                ref={aboutRef}
                title="walker riley" 
                description="software engineer. photographer. actor. human being." 
                backgroundImage="/assets/field.JPG" 
                showButton={false}
                className="first-section-content"
              />
              <Section 
                ref={softwareRef}
                title="software" 
                description={
                  <>
                    <p>I’m a versatile software engineer passionate about building impactful tools at the intersection of artificial intelligence, data, and user-centered design.</p>

                    <p>From refining AI language models and crafting intelligent automation systems to developing full-stack applications from the ground up, I combine deep technical skill with a creative, builder’s mindset.</p>

                    <p>My experience spans AI research, machine learning engineering, and real-world app development—backed by a strong foundation in Python, JavaScript, and system architecture.</p>

                    <p>Whether optimizing models in cloud environments or designing intuitive digital experiences, I approach every project with precision, curiosity, and a drive to make technology meaningful.</p>

                    <p>I’m currently open to remote opportunities and excited to collaborate with teams focused on innovation, intelligent systems, and elegant engineering solutions.</p>

                  </>
                } 
                backgroundImage="/assets/lotus.jpg" 
              />
              <Section 
                ref={photographyRef}
                title="photography" 
                description={
                  <>
                    <p>I don't just take pictures — I hunt for the cracks in reality. The unguarded moments. The quiet chaos. My lens is drawn to the stories etched in scenes and in faces, the tension in empty streets, the raw, unfiltered truth that most people walk right past.</p>
                    <p>This is conceptual portraiture with teeth. Street photography with a pulse. Every frame is a confrontation — with myself, with the subject, with the world. I don't just observe; I dissect. </p>
                    <p>Creative direction? It's not about control. It's about controlled chaos. I build concepts, then set them on fire. I coax vulnerability out of strangers, then freeze it in time. Every shoot is a tightrope walk between intention and accident.</p>
                    <p>This isn't just photography. It's an exorcism.</p>
                  </>
                }
                backgroundImage="/assets/lamp.jpg" 
              />
              <Section 
                ref={actingModelingRef}
                title="acting-modeling" 
                description={
                  <>
                    <p>Driven by a passion for authentic storytelling, I bring emotional depth and creative adaptability to every project—whether acting on screen or modeling in front of the lens.</p>

                    <p>I've led short films, taken on dynamic supporting roles in drama series, and delivered grounded background performances that enhance every scene with purpose.</p>

                    <p>As a model, I specialize in editorial shoots, look books, and commercial campaigns—collaborating closely with photographers and designers to bring bold, expressive concepts to life.</p>

                    <p>My work has included opportunities with major brands like <strong>ASUS</strong>, giving me a strong foundation in both commercial and creative environments.</p>

                    <p>Disciplined, curious, and professional, I approach every role with intention, aiming to create visuals that resonate and storytelling that connects.</p>

                  </>
                }
                backgroundImage="/assets/borgar.JPG"
              />
            </>
          } />
          <Route path="/software" element={<Software />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/portraiture" element={<PortraitureView />} />
          <Route path="/photography/street" element={<StreetView />} />
          <Route path="/acting-modeling" element={<ActingModeling />} />
        </Routes>
      </main>
      {showPopup && (
        <div className="popup">
          <p>It's in the corner, didn't you see it, silly?</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </>
  );
}

export default App;