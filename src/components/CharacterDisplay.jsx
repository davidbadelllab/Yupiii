import React, { useState, useEffect } from "react";
import { Coins, X } from "lucide-react";
import { useCharacter } from '../context/CharacterContext';

const CharacterDisplay = () => {
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const [progress, setProgress] = useState(0);
  const [coins, setCoins] = useState(0);
  const [clickEffects, setClickEffects] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const characters = [
    { id: 1, name: "Zabolia", image: "/img/1.jpg" },
    { id: 2, name: "Camivon", image: "/img/2.jpg" },
    { id: 3, name: "Zusurrocon", image: "/img/3.jpg" },
    { id: 4, name: "Laviton", image: "/img/4.jpg" },
    { id: 5, name: "Caminaya", image: "/img/5.jpg" },
    { id: 6, name: "Zabrotan", image: "/img/6.jpg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCharacterClick = () => {
    setIsModalOpen(true);
  };

  const handleCoinClick = (event) => {
    if (progress >= 100) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newEffect = {
        id: Date.now(),
        x,
        y,
      };

      setClickEffects((prev) => [...prev, newEffect]);
      setCoins((prev) => prev + 10);
      setProgress(0);
      setIsCollecting(true);

      setTimeout(() => {
        setClickEffects((prev) =>
          prev.filter((effect) => effect.id !== newEffect.id)
        );
        setIsCollecting(false);
      }, 1000);
    }
  };

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(false);
  };

  const CharacterModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-white/10">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Seleccionar Personaje</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {characters.map((character) => (
                <div
                  key={character.id}
                  onClick={() => handleSelectCharacter(character)}
                  className="relative group cursor-pointer"
                >
                  <div className="relative w-full pb-[100%] rounded-lg overflow-hidden bg-gray-800/50">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-xs text-white font-medium">{character.name}</span>
                    </div>

                    {selectedCharacter.id === character.id && (
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-lg">
                        <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#3B82F6 ${progress}%, transparent ${progress}%)`,
              }}
            />
            <div
              className={`relative w-full h-full rounded-full overflow-hidden cursor-pointer 
                ${progress >= 100 ? "hover:scale-105" : ""} 
                ${isCollecting ? "scale-95" : ""} 
                transition-all duration-200`}
              onClick={handleCoinClick}
            >
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-full h-full object-cover"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCharacterClick();
                }}
              />

              {clickEffects.map((effect) => (
                <div
                  key={effect.id}
                  className="absolute flex items-center animate-float-up"
                  style={{ left: effect.x, top: effect.y }}
                >
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-bold ml-1">
                    +10
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[270px] bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {selectedCharacter.name}
                  <span className="text-[10px] font-normal bg-gradient-to-r from-purple-500 to-pink-500 py-0.5 px-1.5 rounded-full text-white shadow-lg shadow-purple-500/30">
                    Lvl 1
                  </span>
                </h3>
                <div className="flex items-center">
                  <div className="text-[10px] text-gray-400 bg-gray-800/50 rounded-full px-1.5 py-0.5">
                    0 XP
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                    style={{ width: "1%" }}
                  >
                    <div className="absolute inset-0 flex">
                      <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between px-1 mt-0.5">
                  <span className="text-[8px] text-gray-400">0</span>
                  <span className="text-[8px] text-gray-400">500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-3">
          <div className="flex justify-between items-center bg-gray-800/30 backdrop-blur-sm rounded-lg h-12 px-2">
            <div className="text-center group">
              <div className="flex justify-center mb-0.5">
                <img
                  src="/img/ton.png"
                  alt="Ton"
                  className="h-10 w-auto transition-transform duration-300 group-hover:rotate-360 group-hover:scale-110"
                />
              </div>
              <div className="rounded bg-gradient-to-r from-blue-500 to-purple-500 text-[10px] font-bold text-white px-1.5 py-0.5 shadow-lg shadow-blue-500/30">
                {coins}
              </div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-0.5">
                <img
                  src="/img/usdt.png"
                  alt="USDT"
                  className="h-8 w-auto transition-transform duration-300 group-hover:rotate-360 group-hover:scale-110"
                />
              </div>
              <div className="rounded bg-gradient-to-r from-green-500 to-teal-500 text-[10px] font-bold text-white px-1.5 py-0.5 shadow-lg shadow-green-500/30">
                {coins}
              </div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-0.5">
                <img
                  src="/img/gema.png"
                  alt="Gemas"
                  className="h-9 w-auto transition-transform duration-300 group-hover:rotate-360 group-hover:scale-110"
                />
              </div>
              <div className="rounded bg-gradient-to-r from-yellow-500 to-orange-500 text-[10px] font-bold text-white px-1.5 py-0.5 shadow-lg shadow-yellow-500/30">
                0
              </div>
            </div>
          </div>
        </div>
      </div>

      <CharacterModal />
    </div>
  );
};

export default CharacterDisplay;