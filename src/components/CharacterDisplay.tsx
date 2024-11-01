import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

const CharacterDisplay: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [coins, setCoins] = useState(0);
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isCollecting, setIsCollecting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCharacterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progress >= 100) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newEffect = {
        id: Date.now(),
        x,
        y
      };

      setClickEffects(prev => [...prev, newEffect]);
      setCoins(prev => prev + 10);
      setProgress(0);
      setIsCollecting(true);

      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
        setIsCollecting(false);
      }, 1000);
    }
  };

  return (
    <div className="relative w-full">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          {/* Avatar del personaje con círculo de progreso */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full" 
                 style={{
                   background: `conic-gradient(#3B82F6 ${progress}%, transparent ${progress}%)`,
                 }} />
            <div
              className={`relative w-full h-full rounded-full overflow-hidden cursor-pointer 
                ${progress >= 100 ? 'hover:scale-105' : ''} 
                ${isCollecting ? 'scale-95' : ''} 
                transition-all duration-200`}
              onClick={handleCharacterClick}
            >
              <img
                src="../../public/img/personaje.png"
                alt="Character Avatar"
                className="w-full h-full object-cover"
              />
              {/* Efectos de monedas */}
              {clickEffects.map(effect => (
                <div
                  key={effect.id}
                  className="absolute flex items-center animate-float-up"
                  style={{ left: effect.x, top: effect.y }}
                >
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-bold ml-1">+10</span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del personaje */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Tu Personaje</h3>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Nivel 1</span>
              <div className="h-2 bg-gray-700 rounded-full flex-1">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats del personaje */}
        <div className="grid grid-cols-3 gap-4 mt-4">
        <div className='rounded-md bg-green-500 bg-clip-content'>
        <button className="flex items-center">
          <img className="w-11 h-11 mr-2" src="../../public/img/skin (2).png" alt="Skin" />
          <span className='w-5 h-5'>Skin</span>
        </button>
      </div>
          <div className="text-center">
            <div className="text-sm text-white-400">Monedas</div>
            <div className="text-2xl font-semibold text-white-400">{coins}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-white-400">Gemas</div>
            <div className="text-2xl font-semibold text-white-400">0</div>
          </div>
        </div>

        {/* Equipamiento o habilidades */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((slot) => (
            <div
              key={slot}
              className="aspect-square bg-gray-700 rounded-lg p-2 flex items-center justify-center"
            >
              <img
                src={`../../public/img/personaje.png`}
                alt={`Item ${slot}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;