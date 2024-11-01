import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import GameNavigation from '../components/GameNavigation';
import CharacterDisplay from '../components/CharacterDisplay';
import Loader from '../components/Loader';
import FarmButton from '../components/FarmButton';

const GameCard = ({ title }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-2 text-center hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
      <div className="bg-gray-700 rounded-lg mb-2 aspect-square relative overflow-hidden">
        <img
          src="/img/personaje.png"
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="text-sm">{title}</div>
      <div className="bg-purple-600 rounded-full text-xs px-2 py-1 mt-1">x3</div>
    </div>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired
};

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        // Verificar si Telegram está disponible
        if (window.Telegram && window.Telegram.WebApp) {
          // Inicializar la WebApp
          const tg = window.Telegram.WebApp;

          // Expandir la webapp a pantalla completa
          tg.expand();

          // Obtener datos del usuario
          const user = tg.initDataUnsafe?.user;
          if (user) {
            setUserData({
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username,
              photoUrl: user.photo_url,
              // Otros datos que quieras usar
            });
          }
        }

        // Si estamos en el proxy del juego de Telegram
        if (window.TelegramGameProxy) {
          window.TelegramGameProxy.receiveEvent = (event) => {
            console.log('Evento recibido:', event);
          };
        }
      } catch (error) {
        console.error('Error inicializando Telegram:', error);
      } finally {
        // Terminar la carga después de procesar todo
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    initTelegram();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pb-16 relative">
      <div className="max-w-md mx-auto p-4">
        {/* Profile Section */}
        <section className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 relative rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900">
              <img
                src={userData?.photoUrl || "/img/personaje.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">
                {userData ? `${userData.firstName} ${userData.lastName || ''}` : 'Usuario'}
                {userData?.username && <span className="text-gray-400 ml-2">@{userData.username}</span>}
              </div>
              <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 w-fit mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-white-400 text-xs">Ganancia por hora</span>
                  <span className="text-white-400 text-lg font-medium">+107,13</span>
                </div>
                <div className="flex items-center gap-1 relative">
                  <img src="../../public/img/moneda.png" alt="Moneda" className="w-8 h-8" />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                // Puedes usar tg.showSettingsButton() aquí si lo necesitas
                if (window.Telegram?.WebApp) {
                  window.Telegram.WebApp.showSettingsButton();
                }
              }}
              className="bg-transparent hover:bg-transparent hover:bg-opacity-10 rounded-full p-2 transition-colors shadow-none hover:shadow-lg"
            >
              <i className="fa-solid fa-gear text-white text-3xl hover:text-green-500"></i>
            </button>
          </div>
        </section>

        {/* Character Display */}
        <CharacterDisplay />
      </div>

      {/* Personaje farmeable */}
      <FarmButton />

      {/* Navigation */}
      <GameNavigation />
    </div>
  );
};

export default Login;