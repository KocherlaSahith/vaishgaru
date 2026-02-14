import React from 'react';
import HamsterRose from './HamsterRose';

const HamsterRosePage = ({ onBackToMain }) => {
  return (
    <div className="hamster-rose-page">
      <div className="page-header">
        <button
          className="back-button"
          onClick={onBackToMain}
        >
          ← Back to Game
        </button>
        <h1 className="page-title">Hamster's Rose Garden 🐹🌹</h1>
        <p className="page-subtitle">Watch the adorable hamster give you beautiful roses!</p>
      </div>
      
      <HamsterRose />
      
      <div className="page-footer">
        <p>Made with 💕 for someone special</p>
      </div>
    </div>
  );
};

export default HamsterRosePage;