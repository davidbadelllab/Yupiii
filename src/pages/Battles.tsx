import React, { useState, useEffect } from 'react';
import GameNavigation from '../components/GameNavigation';
import Loader from '../components/Loader';

const Battles = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div 
      className="min-h-screen relative text-white pb-20"
      style={{
        backgroundImage: 'url("/img/Battles.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Contenido */}
      <div className="relative z-10">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Battles</h1>
          <div className="space-y-6">
            <div className="flex justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Beta
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-200 text-justify leading-relaxed">
                ¡Prepárate para la aventura en Turtle-Farm! 🐢🌟 Este emocionante juego te lleva al vibrante mundo de las tortugas, donde no solo crías y cuidas a estas adorables criaturas, sino que también las entrenas para batallas épicas. 🥊🔥
              </p>

              <p className="text-gray-200 text-justify leading-relaxed">
                En Turtle-Farm, cada tortuga tiene habilidades únicas que puedes mejorar y personalizar. Equipa a tus tortugas con armaduras y habilidades especiales para enfrentar a otros jugadores en el emocionante campo de batalla. 🛡️⚔️
              </p>

              <p className="text-gray-200 text-justify leading-relaxed">
                Explora diversos entornos, desde playas soleadas hasta bosques misteriosos, donde tus tortugas pueden buscar recursos y entrenar. 🏝️🌲 Cada batalla es una oportunidad para demostrar tu estrategia y llevar a tu equipo al éxito. Con cada victoria, tus tortugas ganan experiencia, lo que permite desbloquear mejoras y técnicas más potentes. 🌟💪
              </p>

              <p className="text-gray-200 text-justify leading-relaxed">
                Prepara a tus tortugas para competir en torneos, desafía a tus amigos y escala en las clasificaciones globales para convertirte en el campeón supremo de Turtle-Farm. 🏆🎉 Además, con eventos regulares y actualizaciones, siempre hay algo nuevo y emocionante esperándote en este mundo animado y lleno de acción. ¡Es hora de batallar y mostrar quién manda en el mundo de las tortugas! 🐢✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <GameNavigation />
    </div>
  );
};

export default Battles;