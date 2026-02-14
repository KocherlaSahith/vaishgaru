import React, { useState, useEffect } from 'react';
import './App.css';
import HamsterRosePage from './HamsterRosePage';

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [showHamsterPage, setShowHamsterPage] = useState(false);
  const [toothExpression, setToothExpression] = useState('neutral');
  const [dialogueMessage, setDialogueMessage] = useState('');
  const [toothHP, setToothHP] = useState(100);
  const [rasmalaiHP, setRasmalaiHP] = useState(100);
  const [battleMessage, setBattleMessage] = useState('');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [damageNumbers, setDamageNumbers] = useState([]);

  // Dialogue for visual novel
  const dialogues = [
    { character: "Vaish", text: "Ouch... my tooth hurts so much! 😢" },
    { character: "Tooth-kun", text: "Fear not, Vaish! I shall protect you from this pain! 💪" },
    { character: "Rasmalai", text: "Hehehe... just one bite won't hurt, right? 🍮" },
    { character: "Tooth-kun", text: "Stay back, you sweet temptress! Vaish must resist!" },
    { character: "Vaish", text: "But it looks so delicious... maybe just a tiny bite?" },
    { character: "Tooth-kun", text: "No! Remember the pain! Think of the dentist!" },
    { character: "Rasmalai", text: "Come on... I'm soft and creamy... I won't hurt... much..." },
    { character: "Vaish", text: "I... I can't! I must be strong!" },
    { character: "Dentist Senpai", text: "Fear not! I have arrived to save the day!" },
    { character: "Tooth-kun", text: "Dentist Senpai! You're here!" },
    { character: "Dentist Senpai", text: "With my magical dental tools, I shall heal you!" },
    { character: "Rasmalai", text: "Nooo! My evil plan is foiled!" },
    { character: "Vaish", text: "Thank you, Dentist Senpai! My tooth feels better already!" },
    { character: "Tooth-kun", text: "Hooray! We did it!" },
    { character: "Dentist Senpai", text: "Remember, brush twice a day and avoid too many sweets!" },
    { character: "Vaish", text: "I will! Thank you everyone!" },
    { character: "Narrator", text: "And so, Vaish's tooth was saved. The Rasmalai was defeated, and everyone lived happily ever after." },
    { character: "Narrator", text: "Tooth saved. Rasmalai postponed. Laugh therapy successful 💖" }
  ];

  const playSound = (soundType) => {
    if (!soundEnabled) return;
    // In a real implementation, you would play actual sound files here
    console.log(`Playing ${soundType} sound`);
  };

  const showDamageNumber = (amount, x, y) => {
    const id = Date.now();
    setDamageNumbers(prev => [...prev, { id, amount, x, y }]);
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== id));
    }, 1000);
  };

  const handlePainkiller = () => {
    setToothExpression('happy');
    setDialogueMessage("Painkiller no Jutsu activated! You feel relief! 💊✨");
    playSound('powerup');
  };

  const handleIceCompress = () => {
    setToothExpression('relieved');
    setDialogueMessage("Ice Compress Mode engaged! Swelling reduced! 🧊❄️");
    playSound('ice');
  };

  const handleEatRasmalai = () => {
    setToothExpression('crying');
    setDialogueMessage("Oh no! The pain intensifies! Why did you do that?! 😭🍮");
    playSound('pain');
    document.querySelector('.App').classList.add('shake');
    setTimeout(() => {
      document.querySelector('.App').classList.remove('shake');
    }, 500);
  };

  const handleBattleAction = (action) => {
    switch (action) {
      case 'eat':
        const toothDamage = Math.floor(Math.random() * 30) + 20;
        setToothHP(prev => Math.max(0, prev - toothDamage));
        setBattleMessage(`You ate Rasmalai! Tooth lost ${toothDamage} HP! 😭`);
        showDamageNumber(toothDamage, 50, 50);
        playSound('damage');
        break;
      case 'resist':
        const rasmalaiDamage = Math.floor(Math.random() * 20) + 10;
        const toothHeal = Math.floor(Math.random() * 10) + 5;
        setRasmalaiHP(prev => Math.max(0, prev - rasmalaiDamage));
        setToothHP(prev => Math.min(100, prev + toothHeal));
        setBattleMessage(`You resisted temptation! Rasmalai lost ${rasmalaiDamage} HP! Tooth healed ${toothHeal} HP! 💪`);
        showDamageNumber(rasmalaiDamage, 50, 150);
        playSound('heal');
        break;
      case 'dentist':
        setToothHP(100);
        setRasmalaiHP(0);
        setBattleMessage("Dentist Senpai arrived! Tooth fully recovered! Rasmalai defeated! 🦷✨");
        playSound('victory');
        break;
      default:
        break;
    }
  };

  const nextDialogue = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentSection(1);
    setToothExpression('neutral');
    setDialogueMessage('');
    setToothHP(100);
    setRasmalaiHP(100);
    setBattleMessage('');
    setDialogueIndex(0);
  };

  useEffect(() => {
    if (toothHP <= 0 && currentSection === 2) {
      setBattleMessage("Oh no! Your tooth gave up! Game Over! Try again?");
    }
    if (rasmalaiHP <= 0 && currentSection === 2) {
      setTimeout(() => {
        setCurrentSection(3);
      }, 2000);
    }
  }, [toothHP, rasmalaiHP, currentSection]);

  const getToothEmoji = () => {
    switch (toothExpression) {
      case 'happy': return '🦷✨';
      case 'relieved': return '🦷😌';
      case 'crying': return '🦷😭';
      default: return '🦷';
    }
  };

  if (showHamsterPage) {
    return <HamsterRosePage onBackToMain={() => setShowHamsterPage(false)} />;
  }

  return (
    <div className="App pastel-bg">
      {/* Sound Toggle */}
      <div className="sound-toggle" style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button
          className="pastel-button"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Navigation to Hamster Page */}
      <div className="nav-toggle" style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <button
          className="pastel-button"
          onClick={() => setShowHamsterPage(true)}
          style={{ backgroundColor: '#f8bbd0' }}
        >
          🐹🌹 Hamster Roses
        </button>
      </div>

      {/* Damage Numbers */}
      {damageNumbers.map(damage => (
        <div 
          key={damage.id} 
          className="damage-number" 
          style={{ left: `${damage.x}px`, top: `${damage.y}px` }}
        >
          -{damage.amount}
        </div>
      ))}

      {/* Section 1: Operation Save Vaish's Tooth */}
      {currentSection === 1 && (
        <div className="section-container fade-in">
          <div className="pastel-card text-center">
            <h1 className="anime-font" style={{ fontSize: '2.5rem', color: '#ff4081' }}>
              Emergency! Vaish's Tooth Is Under Attack!
            </h1>
            
            <div className="mt-20 mb-20">
              <div className={`tooth-character ${toothExpression === 'crying' ? 'shake' : 'bounce'}`} 
                   style={{ fontSize: '5rem' }}>
                {getToothEmoji()}
              </div>
            </div>

            {dialogueMessage && (
              <div className="dialogue-box slide-in">
                <p>{dialogueMessage}</p>
              </div>
            )}

            <div className="flex-center flex-column mt-20">
              <button className="pastel-button" onClick={handlePainkiller}>
                Painkiller no Jutsu 💊
              </button>
              <button className="pastel-button" onClick={handleIceCompress}>
                Ice Compress Mode 🧊
              </button>
              <button className="pastel-button" onClick={handleEatRasmalai}>
                Eat Rasmalai 🍮 (Bad Choice)
              </button>
            </div>

            <button 
              className="pastel-button mt-20" 
              onClick={() => setCurrentSection(2)}
              style={{ backgroundColor: '#80deea' }}
            >
              Continue Mission ➜
            </button>
          </div>
        </div>
      )}

      {/* Section 2: Rasmalai VS Tooth - Anime Battle */}
      {currentSection === 2 && (
        <div className="section-container fade-in">
          <div className="pastel-card" style={{ width: '80%', maxWidth: '600px' }}>
            <h1 className="anime-font text-center" style={{ fontSize: '2rem', color: '#ff4081' }}>
              Rasmalai VS Tooth - Anime Battle ⚔️
            </h1>

            <div className="mt-20">
              <div className="text-center">
                <h3>Tooth HP 🦷</h3>
                <div className="health-bar">
                  <div className="health-fill" style={{ width: `${toothHP}%` }}></div>
                </div>
                <p>{toothHP}/100</p>
              </div>

              <div className="text-center mt-20">
                <h3>Rasmalai HP 🍮</h3>
                <div className="health-bar">
                  <div className="health-fill" style={{ width: `${rasmalaiHP}%`, backgroundColor: '#ce93d8' }}></div>
                </div>
                <p>{rasmalaiHP}/100</p>
              </div>
            </div>

            {battleMessage && (
              <div className="dialogue-box slide-in">
                <p>{battleMessage}</p>
              </div>
            )}

            <div className="flex-center flex-column mt-20">
              <button className="pastel-button" onClick={() => handleBattleAction('eat')}>
                Eat Rasmalai
              </button>
              <button className="pastel-button" onClick={() => handleBattleAction('resist')}>
                Resist Temptation
              </button>
              <button className="pastel-button" onClick={() => handleBattleAction('dentist')}>
                Call Dentist Senpai
              </button>
            </div>

            {rasmalaiHP <= 0 && (
              <div className="text-center mt-20">
                <button 
                  className="pastel-button" 
                  onClick={() => setCurrentSection(3)}
                  style={{ backgroundColor: '#80deea' }}
                >
                  Story Mode Unlocked 🎬
                </button>
              </div>
            )}

            {toothHP <= 0 && (
              <div className="text-center mt-20">
                <button 
                  className="pastel-button" 
                  onClick={() => {
                    setToothHP(100);
                    setRasmalaiHP(100);
                    setBattleMessage('');
                  }}
                  style={{ backgroundColor: '#ffab91' }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 3: Vaish's Toothache - Anime Visual Novel */}
      {currentSection === 3 && (
        <div className="section-container fade-in">
          <div className="pastel-card" style={{ width: '80%', maxWidth: '800px' }}>
            <h1 className="anime-font text-center" style={{ fontSize: '2rem', color: '#ff4081' }}>
              Vaish's Toothache - Anime Visual Novel
            </h1>

            <div className="flex-center mt-20">
              <div className="character-image pulse" style={{ 
                backgroundImage: `url(${dialogues[dialogueIndex].character === 'Vaish' ? 'https://picsum.photos/seed/vaish/200/200.jpg' : 
                                dialogues[dialogueIndex].character === 'Tooth-kun' ? 'https://picsum.photos/seed/tooth/200/200.jpg' :
                                dialogues[dialogueIndex].character === 'Rasmalai' ? 'https://picsum.photos/seed/rasmalai/200/200.jpg' :
                                dialogues[dialogueIndex].character === 'Dentist Senpai' ? 'https://picsum.photos/seed/dentist/200/200.jpg' :
                                'https://picsum.photos/seed/narrator/200/200.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
            </div>

            <div className="dialogue-box mt-20">
              <h3 className="anime-font" style={{ color: '#ff4081', marginBottom: '10px' }}>
                {dialogues[dialogueIndex].character}
              </h3>
              <p>{dialogues[dialogueIndex].text}</p>
            </div>

            <div className="flex-center mt-20">
              {dialogueIndex < dialogues.length - 1 ? (
                <button className="pastel-button" onClick={nextDialogue}>
                  Next ➜
                </button>
              ) : (
                <button className="pastel-button" onClick={resetGame} style={{ backgroundColor: '#80deea' }}>
                  Play Again 🔄
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
