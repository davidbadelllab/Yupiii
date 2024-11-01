import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CircleDollarSign, User, BicepsFlexed, Pickaxe, BadgeCheck } from 'lucide-react';

const GameNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstVisit = !localStorage.getItem('hasVisitedBefore');

  useEffect(() => {
    // Si es la primera visita y no estamos en home, redirigir a home
    if (isFirstVisit && location.pathname !== '/home') {
      localStorage.setItem('hasVisitedBefore', 'true');
      navigate('/home');
    }
  }, [isFirstVisit, location.pathname, navigate]);

  const navigationItems = [
    {
      path: isFirstVisit ? '/home' : '/login',
      name: 'Inicio',
      icon: <Home className="w-5 h-5" />,
    },
    {
      path: '/mine',
      name: 'Mine',
      icon: <Pickaxe className="w-5 h-5" />,
      requiresVisit: true
    },
    {
      path: '/friends',
      name: 'Friends',
      icon: <User className="w-5 h-5" />,
      requiresVisit: true
    },
    {
      path: '/tareas',
      name: 'Tareas',
      icon: <BadgeCheck className="w-5 h-5" />,
      requiresVisit: true
    },
    {
      path: '/battles',
      name: 'Battles',
      icon: <BicepsFlexed className="w-5 h-5" />,
      beta: true,
      requiresVisit: true
    },
    {
      path: '/airdrop',
      name: 'AirDrop',
      icon: <CircleDollarSign className="w-5 h-5" />,
      beta: true,
      requiresVisit: true
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path, requiresVisit) => {
    if (requiresVisit && isFirstVisit) {
      // Si requiere visita previa y es primera visita, ir a home
      navigate('/home');
    } else {
      navigate(path);
    }
  };

  // Si es la primera visita, solo mostrar el botón de inicio
  const visibleItems = isFirstVisit 
    ? navigationItems.slice(0, 1) 
    : navigationItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-14">
          {visibleItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path, item.requiresVisit)}
              className={`relative flex flex-col items-center px-2 py-1 rounded-lg transition-colors duration-200 w-full
                ${isActive(item.path) ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive(item.path)
                    ? 'text-blue-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs ${
                  isActive(item.path)
                    ? 'text-blue-500 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {item.name}
              </span>
              {item.beta && (
                <span className="absolute -top-2 right-1/4 bg-white px-1.5 py-0.5 rounded-md text-red-500 text-xs font-mono">
                  beta
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default GameNavigation;