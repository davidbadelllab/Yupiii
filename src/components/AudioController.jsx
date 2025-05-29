import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';

const AutoAudioController = ({ children }) => {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (location.pathname === '/landing' && showOverlay) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleStart();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [location.pathname, showOverlay]);

  const handleStart = () => {
    try {
      // Mostrar confetti
      setShowConfetti(true);

      // Reproducir voz en off
      const voiceAudio = new Audio('/audio/vozenoff.mp3');
      voiceAudio.volume = 1;
      voiceAudio.play();

      // Reproducir truenos con delay
      setTimeout(() => {
        const playThunder = () => {
          const thunder = new Audio('/audio/relampago1.mp3');
          thunder.volume = 0.7;
          thunder.play();
        };

        playThunder();
        // Configurar intervalo para truenos
        setInterval(playThunder, 30000);
      }, 1000);

      // Ocultar confetti después de 5 segundos
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

    } catch (error) {
      console.error('Error playing audio:', error);
    }

    // Ocultar overlay
    setShowOverlay(false);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      {showOverlay && location.pathname === '/landing' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-white text-xl mb-4">
              Vive la SFX en {countdown} segundos...
            </div>
            <button
              onClick={handleStart}
              className="w-28 h-12 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
            >
              Vamos!!!
            </button>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default AutoAudioController;