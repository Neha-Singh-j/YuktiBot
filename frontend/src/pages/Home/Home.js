import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to YuktiBot</h1>
        <p>Practice coding, prepare for interviews, and improve your skills</p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card" onClick={() => navigateTo('/code-editor')}>
          <h2>Code Editor</h2>
          <p>Write and execute code in multiple languages</p>
        </div>
        
        <div className="feature-card" onClick={() => navigateTo('/interview')}>
          <h2>Interview Prep</h2>
          <p>Practice with real interview questions</p>
        </div>
      </div>
    </div>
  );
}

export default Home;