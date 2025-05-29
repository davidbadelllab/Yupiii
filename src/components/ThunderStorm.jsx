import React, { useState, useEffect } from 'react';

const LightningBolt = ({ pathData, duration, delay, color, position }) => (
  <div 
    className="absolute inset-0" 
    style={{ 
      animationDelay: `${delay}ms`,
      left: `${position}%`,
      width: '40%'
    }}
  >
    <svg
      className="w-full h-full absolute"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="0.2"
        className="lightning-path"
        opacity="0.6"
      >
        <animate
          attributeName="opacity"
          values="0;0.6;0.3;0.6;0"
          dur={`${duration}ms`}
          repeatCount="1"
        />
      </path>
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        filter="blur(2px)"
        className="lightning-glow"
        opacity="0.3"
      >
        <animate
          attributeName="opacity"
          values="0;0.3;0.1;0.3;0"
          dur={`${duration}ms`}
          repeatCount="1"
        />
      </path>
    </svg>
  </div>
);

const ThunderStorm = () => {
  const [bolts, setBolts] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const colors = [
    'rgba(219, 39, 119, 0.8)', // Rosa
    'rgba(59, 130, 246, 0.8)',  // Azul
    'rgba(139, 69, 19, 0.8)',   // Marrón
  ];

  // Precarga de audios
  useEffect(() => {
    const thunder1 = new Audio('/audio/relampago1.mp3');
    const thunder2 = new Audio('/audio/relampago2.mp3');

    const loadAudios = async () => {
      try {
        await thunder1.load();
        await thunder2.load();
        setAudioEnabled(true);
      } catch (error) {
        console.error('Error loading thunder sounds:', error);
      }
    };

    loadAudios();
  }, []);

  const playThunder = async () => {
    if (!audioEnabled) return;

    try {
      const audio = new Audio(
        Math.random() > 0.5 ? '/audio/relampago1.mp3' : '/audio/relampago2.mp3'
      );
      audio.volume = 0.7;
      await audio.play();

      return new Promise((resolve) => {
        audio.onended = () => {
          audio.remove();
          resolve();
        };
      });
    } catch (error) {
      console.error('Error playing thunder:', error);
    }
  };

  const generateBranch = (startX, startY, depth = 0) => {
    if (depth > 3) return '';
    const endX = startX + (Math.random() * 20 - 10);
    const endY = startY + (Math.random() * 10 + 5);
    let branch = ` M ${startX} ${startY} L ${endX} ${endY}`;
    
    if (depth < 2 && Math.random() > 0.5) {
      branch += generateBranch(endX, endY, depth + 1);
    }
    
    return branch;
  };

  const generateLightningPath = () => {
    let path = `M ${50 + (Math.random() * 20 - 10)} 0`;
    let currentY = 0;
    let currentX = 50;

    while (currentY < 100) {
      currentY += Math.random() * 10 + 5;
      const newX = currentX + (Math.random() * 30 - 15);
      currentX = newX;
      path += ` L ${newX} ${currentY}`;

      if (Math.random() > 0.6) {
        path += generateBranch(newX, currentY);
      }
    }
    return path;
  };

  useEffect(() => {
    const createLightning = async () => {
      if (!audioEnabled) return;

      const duration = 1000;
      const newBolt = {
        id: Date.now(),
        path: generateLightningPath(),
        duration,
        delay: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        position: Math.random() * 80
      };

      setBolts(prev => [...prev, newBolt]);
      await playThunder();
      
      setBolts(prev => prev.filter(bolt => bolt.id !== newBolt.id));

      const nextTime = Math.random() * 15000 + 25000;
      setTimeout(createLightning, nextTime);
    };

    if (audioEnabled) {
      const timer = setTimeout(createLightning, 2000);
      return () => clearTimeout(timer);
    }
  }, [audioEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <style>
        {`
          .lightning-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawLightning 1s linear forwards;
          }

          .lightning-glow {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawLightning 1s linear forwards;
          }

          @keyframes drawLightning {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes flashBg {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.1; }
          }

          .flash {
            animation: flashBg 1s linear;
          }
        `}
      </style>
      {bolts.map(bolt => (
        <LightningBolt
          key={bolt.id}
          pathData={bolt.path}
          duration={bolt.duration}
          delay={bolt.delay}
          color={bolt.color}
          position={bolt.position}
        />
      ))}
      {bolts.length > 0 && (
        <div className="absolute inset-0 bg-white/5 flash mix-blend-overlay" />
      )}
    </div>
  );
};

export default ThunderStorm;