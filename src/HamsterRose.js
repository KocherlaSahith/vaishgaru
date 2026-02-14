import React, { useState, useEffect } from 'react';
import './HamsterRose.css';

const HamsterRose = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [roseCount, setRoseCount] = useState(1);
  const [heartCount, setHeartCount] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const [candyCount, setCandyCount] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [currentGift, setCurrentGift] = useState('rose');

  useEffect(() => {
    // Generate random sparkles
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 2,
        size: 5 + Math.random() * 10
      };
      setSparkles(prev => [...prev, newSparkle]);
      
      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 4000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleGiveGift = () => {
    setIsAnimating(true);
    
    switch (currentGift) {
      case 'rose':
        setRoseCount(prev => Math.min(prev + 1, 12)); // Max 12 roses in bouquet
        break;
      case 'heart':
        setHeartCount(prev => Math.min(prev + 1, 8)); // Max 8 hearts
        break;
      case 'star':
        setStarCount(prev => Math.min(prev + 1, 10)); // Max 10 stars
        break;
      case 'candy':
        setCandyCount(prev => Math.min(prev + 1, 6)); // Max 6 candies
        break;
      default:
        break;
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const handleReset = () => {
    setRoseCount(1);
    setHeartCount(0);
    setStarCount(0);
    setCandyCount(0);
    setIsAnimating(false);
  };

  return (
    <div className="hamster-rose-container">
      <div className="scene">
        {/* Sparkles */}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.left}%`,
              animationDuration: `${sparkle.animationDuration}s`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`
            }}
          ></div>
        ))}
        
        {/* Hamster */}
        <div className={`hamster ${isAnimating ? 'giving' : ''}`}>
          <div className="hamster-body">
            <div className="hamster-head">
              <div className="hamster-ears">
                <div className="ear left"></div>
                <div className="ear right"></div>
              </div>
              <div className="hamster-face">
                <div className="hamster-eyes">
                  <div className="eye left"></div>
                  <div className="eye right"></div>
                </div>
                <div className="hamster-nose"></div>
                <div className="hamster-mouth"></div>
              </div>
            </div>
            <div className="hamster-tummy"></div>
            <div className="hamster-arms">
              <div className={`arm left ${isAnimating ? 'giving-left' : ''}`}></div>
              <div className={`arm right ${isAnimating ? 'giving-right' : ''}`}></div>
            </div>
            <div className="hamster-legs">
              <div className="leg front-left"></div>
              <div className="leg front-right"></div>
              <div className="leg back-left"></div>
              <div className="leg back-right"></div>
            </div>
          </div>
        </div>
        
        {/* Gift Bouquet */}
        <div className={`gift-bouquet ${isAnimating ? 'presenting' : ''}`}>
          {/* Roses */}
          {Array.from({ length: roseCount }).map((_, index) => (
            <div
              key={`rose-${index}`}
              className="rose"
              style={{
                transform: `rotate(${(index - roseCount / 2) * 15}deg) translateY(${-Math.abs(index - roseCount / 2) * 3}px)`,
                zIndex: roseCount - Math.abs(index - roseCount / 2)
              }}
            >
              <div className="rose-stem"></div>
              <div className="rose-petals">
                <div className="petal petal-1"></div>
                <div className="petal petal-2"></div>
                <div className="petal petal-3"></div>
                <div className="petal petal-4"></div>
                <div className="petal petal-5"></div>
                <div className="rose-center"></div>
              </div>
              <div className="rose-leaf left"></div>
              <div className="rose-leaf right"></div>
            </div>
          ))}
          
          {/* Hearts */}
          {Array.from({ length: heartCount }).map((_, index) => (
            <div
              key={`heart-${index}`}
              className="heart"
              style={{
                transform: `rotate(${(index - heartCount / 2) * 20}deg) translateY(${-Math.abs(index - heartCount / 2) * 5}px)`,
                zIndex: heartCount - Math.abs(index - heartCount / 2)
              }}
            >
              <div className="heart-shape"></div>
            </div>
          ))}
          
          {/* Stars */}
          {Array.from({ length: starCount }).map((_, index) => (
            <div
              key={`star-${index}`}
              className="star"
              style={{
                transform: `rotate(${(index - starCount / 2) * 18}deg) translateY(${-Math.abs(index - starCount / 2) * 4}px)`,
                zIndex: starCount - Math.abs(index - starCount / 2)
              }}
            >
              <div className="star-shape"></div>
            </div>
          ))}
          
          {/* Candies */}
          {Array.from({ length: candyCount }).map((_, index) => (
            <div
              key={`candy-${index}`}
              className="candy"
              style={{
                transform: `rotate(${(index - candyCount / 2) * 25}deg) translateY(${-Math.abs(index - candyCount / 2) * 6}px)`,
                zIndex: candyCount - Math.abs(index - candyCount / 2)
              }}
            >
              <div className="candy-wrapper"></div>
            </div>
          ))}
          
          <div className="bouquet-ribbon"></div>
        </div>
        
        {/* Ground */}
        <div className="ground">
          <div className="ground-texture"></div>
        </div>
      </div>
      
      {/* Gift Selection */}
      <div className="gift-selection">
        <button
          className={`gift-button ${currentGift === 'rose' ? 'active' : ''}`}
          onClick={() => setCurrentGift('rose')}
        >
          🌹 Roses
        </button>
        <button
          className={`gift-button ${currentGift === 'heart' ? 'active' : ''}`}
          onClick={() => setCurrentGift('heart')}
        >
          💖 Hearts
        </button>
        <button
          className={`gift-button ${currentGift === 'star' ? 'active' : ''}`}
          onClick={() => setCurrentGift('star')}
        >
          ⭐ Stars
        </button>
        <button
          className={`gift-button ${currentGift === 'candy' ? 'active' : ''}`}
          onClick={() => setCurrentGift('candy')}
        >
          🍬 Candies
        </button>
      </div>
      
      {/* Controls */}
      <div className="controls">
        <button className="gift-button-action" onClick={handleGiveGift}>
          Give {currentGift === 'rose' ? '🌹 Rose' :
                currentGift === 'heart' ? '💖 Heart' :
                currentGift === 'star' ? '⭐ Star' : '🍬 Candy'}
        </button>
        <button className="reset-button" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
      
      {/* Counters */}
      <div className="counters">
        <div className="counter">🌹 {roseCount}/12</div>
        <div className="counter">💖 {heartCount}/8</div>
        <div className="counter">⭐ {starCount}/10</div>
        <div className="counter">🍬 {candyCount}/6</div>
      </div>
      
      {/* Message */}
      <div className="message">
        <p>A cute hamster wants to give you gifts! 🐹💕</p>
      </div>
    </div>
  );
};

export default HamsterRose;