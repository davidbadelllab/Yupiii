import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsLoading(false);
    };

    // Verificar inmediatamente
    checkDevice();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkDevice);

    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isLoading };
};

export default useDeviceType;