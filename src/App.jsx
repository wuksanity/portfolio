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
                image="about"
                focus="50% 15%"
                priority
                showButton={false}
                className="first-section-content"
              />
              <Section 
                ref={softwareRef}
                title="software" 
                description={
                  <>
                    <p>I build software end to end: from the first conversation with a client to production, and everything that keeps it running after.</p>

                    <p>As the sole engineer on both, I designed and shipped <strong>StagewayPDX</strong>, a marketplace that books Portland musicians into venues, and <strong>Golden Goat</strong>, an ethical streaming platform for independent film. Now I'm building <strong>A Useful Tool</strong>, a language-learning game with its own translation engine and game engine.</p>

                    <p>Before that, I helped train code-writing AI at DataAnnotation and built machine learning for insurance documents at Arch Capital. Open to remote roles.</p>

                  </>
                } 
                image="lotus"
                focus="60% 50%"
              />
              <Section 
                ref={photographyRef}
                title="photography" 
                description={
                  <>
                    <p>I hunt for the cracks in reality. The unguarded moments. My lens is drawn to the stories etched in scenes and in faces, the tension in empty streets, the raw, unfiltered truth often missed in passing.</p>
                    <p>This is conceptual portraiture with teeth. Street photography with a pulse. Every frame is a confrontation — with myself, with the subject, and with the world. </p>
      
                  </>
                }
                image="portraits/lamp"
                focus="52% 50%"
              />
              <Section 
                ref={actingModelingRef}
                title="acting and modeling" 
                description={
                  <>
                    <p>well, i suppose you'll just have to see.</p>

                  </>
                }
                image="stairs"
                focus="57% 30%"
                to="/acting-modeling"
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
          <p>it's...in...the...corner</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}

    </>
  );
}

export default App;