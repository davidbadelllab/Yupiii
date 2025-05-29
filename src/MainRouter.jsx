import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Mine from './pages/Mine';
import Friends from './pages/Friends';
import Tareas from './pages/Tareas';
import Battles from './pages/Battles';
import AirDrop from './pages/AirDrop';
import LandingPage from './pages/LandingPage';

// Componente para la redirección inicial
const InitialRoute = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return <Navigate to={isMobile ? "/home" : "/landing"} replace />;
};

function MainRouter() {
  return (
    <Router>
      <Routes>
        {/* Ruta inicial con redirección */}
        <Route path="/" element={<InitialRoute />} />
        
        {/* Landing Page (desktop) */}
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Rutas de la aplicación */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/airdrop" element={<AirDrop />} />
        
        {/* Ruta para manejar URLs no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;