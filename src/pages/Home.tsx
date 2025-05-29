import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';

function Home() {
  const slides = [
    {
      id: 'slide1',
      animation: '/img/animate1.json',
      title: '¡Bienvenido a Battle Elements!',
      description: 'Un emocionante juego crypto donde cada batalla cuenta. Combina elementos, forma estrategias y gana recompensas reales mientras te diviertes.',
      color: 'text-yellow-400'
    },
    {
      id: 'slide2',
      animation: '/img/animate2.json',
      title: 'Farmea y Gana',
      description: 'Completa misiones diarias, participa en eventos especiales y acumula tokens. Cada acción te acerca más a increíbles recompensas.',
      color: 'text-blue-400'
    },
    {
      id: 'slide3',
      animation: '/img/animate3.json',
      title: 'Únete a la Aventura',
      description: 'Forma parte de una comunidad apasionada, comercia elementos únicos en el marketplace y construye tu imperio en Battle Elements.',
      color: 'text-green-400'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular tiempo de carga
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      navigate('/login');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-900 overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="min-w-full h-full flex flex-col items-center justify-center px-6"
          >
            <div className="w-64 h-64 mb-8">
              <Player
                autoplay
                loop
                src={slide.animation}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${slide.color}`}>
              {slide.title}
            </h2>
            <p className="text-white text-center mb-8">
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-full disabled:opacity-50"
        >
          Anterior
        </button>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? 'bg-yellow-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-full"
        >
          {currentIndex === slides.length - 1 ? 'Comenzar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}

export default Home;