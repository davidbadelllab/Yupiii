import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CharacterProvider, useCharacter } from '../context/CharacterContext';
import GameNavigation from '../components/GameNavigation';
import CharacterDisplay from '../components/CharacterDisplay';
import Loader from '../components/Loader';
import FarmButton from '../components/FarmButton';
import SettingsModal from '../components/SettingsModal';

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

const LoginContent = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { selectedCharacter } = useCharacter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        if (window.Telegram && window.Telegram.WebApp) {
          const tg = window.Telegram.WebApp;
          tg.expand();

          const user = tg.initDataUnsafe?.user;
          if (user) {
            setUserData({
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username,
              photoUrl: user.photo_url,
            });
          }
        }

        if (window.TelegramGameProxy) {
          window.TelegramGameProxy.receiveEvent = (event) => {
            console.log('Evento recibido:', event);
          };
        }
      } catch (error) {
        console.error('Error inicializando Telegram:', error);
      } finally {
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
    <>
      <div className="bg-gray-900 text-white min-h-screen pb-16 relative">
        <div className="max-w-md mx-auto p-4">
          {/* Profile Section */}
          <section className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 relative rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900">
                <img
                  src={selectedCharacter.image}
                  //  alt={selectedCharacter.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {userData ? `${userData.firstName} ${userData.lastName || ''}` : selectedCharacter.name}
                  {userData?.username && (
                    <span className="text-gray-400 ml-2">@{userData.username}</span>
                  )}
                </div>
                <div className="flex items-center bg-gray-800 rounded-full px-6 py-2 mt-2 w-[280px]">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-white-400 text-lg">Ganancia por hora</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white-400 text-lg font-medium">+0</span>
                      <img src="/img/moneda.png" alt="Moneda" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="bg-transparent hover:bg-gray-800/50 rounded-full p-2 transition-colors duration-200 ml-2"
              >
                <i className="fa-solid fa-gear text-white text-2xl hover:text-green-500 transition-colors duration-200"></i>
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

      {/* Modal de configuración */}
      {isSettingsOpen && (
        <div className="relative z-[100]">
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

const Login = () => {
  return (
    <CharacterProvider>
      <LoginContent />
    </CharacterProvider>
  );
};

export default Login;