import React from 'react';
import Header from './components/Header';
import Section from './components/Section';
import './App.css';

function App() {
  return (
    <>
      <main>
        <Header />
        <Section 
          title="About Walker Riley" 
          description="Your name and positions" 
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
        />
        <Section 
          title="Software" 
          description="Your software roles and experience" 
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
        />
        <Section 
          title="Photography" 
          description="Photography description" 
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
        />
        <Section 
          title="Acting/Modeling" 
          description="Acting and modeling description" 
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
        />
      </main>
    </>
  );
}

export default App;