import React, { useState, useRef } from 'react';
import { Coins } from 'lucide-react';
import Energy from './Energy';
import Impulsa from './Impulsa';

const FarmButton = () => {
  const [coins, setCoins] = useState(0);
  const [clickEffects, setClickEffects] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const audioRef = useRef(null);

  // Crear el elemento de audio una vez al montar el componente
  if (!audioRef.current) {
    audioRef.current = new Audio('/audio/audio.mp3');
  }

  const playSound = () => {
    // Reiniciar el audio si ya está reproduciéndose
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(error => {
      console.log("Error reproduciendo el sonido:", error);
    });
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCoins(prev => +(prev + 0.01).toFixed(2));

    // Reproducir el sonido
    playSound();

    const newEffect = {
      id: Date.now(),
      x,
      y
    };

    setClickEffects(prev => [...prev, newEffect]);
    setIsCollecting(true);

    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
      setIsCollecting(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-98 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* Contador de monedas */}
      <div className="flex items-center justify-center mb-4">
        <img src="../../public/img/moneda.png" className="w-11 h-11 text-white-400 mr-2"  alt="" />
        <span className="text-white-400 font-bold text-2xl">
          {coins.toFixed(2)}
        </span>
      </div>

      {/* Botón con personaje */}
      <div className="relative">
        <button
          onClick={handleClick}
          className={`relative w-70 h-70 rounded-full overflow-hidden focus:outline-none 
            hover:scale-105 
            ${isCollecting ? 'scale-95' : ''} 
            transition-all duration-300 
            shadow-2xl hover:shadow-2xl
            bg-gray-800
            border-8 border-gray-700`}
        >
          <img
            src="/img/personaje.png"
            alt="Personaje"
            className="w-full h-full object-contain transform scale-60"
          />
        </button>

        {/* Efectos de monedas */}
        {clickEffects.map(effect => (
          <div
            key={effect.id}
            className="absolute flex items-center animate-float-up pointer-events-none"
            style={{ left: effect.x, top: effect.y }}
          >
            
            <img src="../../public/img/moneda.png" className="w-10 h-10 text-yellow-400" alt="" />
            <span className="text-yellow-400 font-bold text-2xl ml-2">+0.01</span>
          </div>
        ))}
      </div>

      {/* Energía e Impulsa */}
      <div className="mt-1 flex items-center justify-between w-full">
        <Energy current={50} max={100} />
        <Impulsa />
      </div>
    </div>
  );
};

export default FarmButton;