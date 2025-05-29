import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Mine from './pages/Mine';
import Friends from './pages/Friends';
import Tareas from './pages/Tareas';
import Battles from './pages/Battles';
import AirDrop from './pages/AirDrop';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import { Toaster } from 'react-hot-toast';
import AudioController from './components/AudioController';


// Componente de redirección inicial
const InitialRedirect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    };

    checkDevice();
  }, []);

  return <Navigate to={isMobile ? "/home" : "/landing"} replace />;
};

function App() {
  return (
    <BrowserRouter>
     <AudioController>
      <Toaster position="top-center" />
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<InitialRedirect />} />
        
        {/* Landing Page */}
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Rutas de la aplicación */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/airdrop" element={<AirDrop />} />

        {/* Ruta para manejar rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AudioController>
    </BrowserRouter>
  );
}

export default App;