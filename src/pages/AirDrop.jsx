import React, { useState, useEffect } from 'react';
import GameNavigation from '../components/GameNavigation';
import Loader from '../components/Loader';

const AirDrop = () => {
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
        backgroundImage: 'url("/img/AirDrop (2).jpg")',
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
          <h1 className="text-2xl font-bold mb-4 text-center">AirDrop</h1>
          <div className="space-y-6">
            <div className="flex justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Beta
              </span>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-200 text-justify leading-relaxed">
              En Turtle-Farm 🐢, los AirDrops son eventos emocionantes donde los jugadores pueden recibir regalos especiales directamente en sus cuentas. 🎁 Estos pueden incluir desde monedas del juego, accesorios exclusivos para tus tortugas, hasta habilidades raras que no están disponibles en la tienda normal. 🌟
              </p>

              <p className="text-gray-200 text-justify leading-relaxed">
              Estos AirDrops sirven para recompensar a los jugadores activos y añadir un elemento de sorpresa y diversión al juego. 🎉 Son una fantástica oportunidad para enriquecer la experiencia de juego, ofreciendo a los jugadores nuevos desafíos y la posibilidad de personalizar aún más a sus queridas tortugas. 🎮💚
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

export default AirDrop;