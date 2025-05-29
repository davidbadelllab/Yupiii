import React, { useState, useEffect } from 'react';

const LightningStorm = () => {
  const [bolts, setBolts] = useState([]);

  useEffect(() => {
    const createLightningPath = () => {
      let path = `M ${Math.random() * 100},-10`; // Comienza desde arriba
      let y = 0;
      
      while (y < 110) { // Excede el viewport para asegurar cobertura completa
        y += Math.random() * 20 + 10;
        const x = Math.random() * 30 - 15;
        path += ` L ${x},${y}`;
        
        // Crear ramificaciones
        if (Math.random() > 0.7) {
          let branchPath = ` M ${x},${y}`;
          let branchX = x;
          let branchY = y;
          for (let i = 0; i < 3; i++) {
            branchX += Math.random() * 40 - 20;
            branchY += Math.random() * 20;
            branchPath += ` L ${branchX},${branchY}`;
          }
          path += branchPath;
        }
      }
      return path;
    };

    const createNewBolt = () => {
      const newBolt = {
        id: Date.now(),
        path: createLightningPath(),
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.6,
        scale: Math.random() * 0.5 + 0.5
      };

      setBolts(prev => [...prev, newBolt]);
      setTimeout(() => {
        setBolts(prev => prev.filter(bolt => bolt.id !== newBolt.id));
      }, 150);
    };

    const stormLoop = () => {
      createNewBolt();
      setTimeout(() => {
        if (Math.random() > 0.5) createNewBolt();
      }, 100);
      
      const nextStrike = Math.random() * 5000 + 2000;
      setTimeout(stormLoop, nextStrike);
    };

    stormLoop();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Overlay para el flash general */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-black/10" />
      
      {/* Contenedor de rayos */}
      <div className="absolute inset-0 overflow-hidden">
        {bolts.map(bolt => (
          <div
            key={bolt.id}
            className="absolute top-0 w-full h-full"
            style={{ left: bolt.left }}
          >
            <svg
              className="w-full h-full transform"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                filter: 'blur(0.5px)',
                transform: `scale(${bolt.scale})`,
              }}
            >
              <path
                d={bolt.path}
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                opacity={bolt.opacity}
                className="animate-lightning-draw"
              >
                <animate
                  attributeName="stroke-width"
                  values="0;2;0.5"
                  dur="0.15s"
                  repeatCount="1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="0.15s"
                  repeatCount="1"
                />
              </path>
              {/* Glow effect */}
              <path
                d={bolt.path}
                stroke="rgba(147, 197, 253, 0.5)"
                strokeWidth="2"
                fill="none"
                opacity={bolt.opacity * 0.5}
                filter="blur(4px)"
                className="animate-lightning-draw"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Flash effect */}
      <div className="absolute inset-0 mix-blend-overlay">
        {bolts.map(bolt => (
          <div
            key={`flash-${bolt.id}`}
            className="absolute inset-0 animate-flash"
            style={{
              background: 'radial-gradient(circle at ${bolt.left} top, rgba(255,255,255,0.1) 0%, transparent 50%)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LightningStorm;