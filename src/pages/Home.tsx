import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  // Datos de las imágenes con texto asociado para cada una
  const images = [
    { 
      id: 'text1', 
      src: '/img/01.jpg', 
      text: '¡Juega, ríe, gana!', 
      position: { 
        bottom: '700px', 
        left: '10px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
      } 
    },
    { 
      id: 'text2', 
      src: '/img/02.jpg', 
      text: '¿Te atreves a jugar?', 
      position: { 
        bottom: '770px', 
        left: '10px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
      } 
    },
    { 
      id: 'text3', 
      src: '/img/03.jpg', 
      text: '¡Entra al juego!', 
      position: { 
        bottom: '425px',  
        left: '200px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
      } 
    },
    { 
      id: 'text4', 
      src: '/img/04.jpg', 
      text: 'Listos, ¡a jugar!', 
      position: { 
        bottom: '365px',  
        left: '120px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
      } 
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificación y carga previa de las imágenes
    images.forEach((image, index) => {
      const img = new Image();
      img.onload = () => console.log(`Image ${index + 1} loaded successfully`);
      img.onerror = () => console.error(`Error loading image ${index + 1}: ${image.src}`);
      img.src = image.src;
    });
  }, []);

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      navigate('./Login'); // Navegar a login al llegar a la última imagen
    } else {
      setCurrentIndex(currentIndex + 1); // Cambiar a la siguiente imagen
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div className="mobile-view">
      <img 
        src={currentImage.src} 
        alt={`Imagen ${currentIndex + 1}`} 
        className="carousel-image" 
      />
      <div 
        id={currentImage.id}
        style={{
          position: 'absolute',
          ...currentImage.position,
          padding: '10px',
          borderRadius: '8px',
          fontSize: '24px',
          zIndex: 10
        }}
      >
        {currentImage.text}
      </div>
      <button 
        onClick={handleNext} 
        className="next-button"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Home;