import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  X, 
  Globe, 
  Volume2, 
  Zap, 
  Wallet,
  Trash2 
} from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    language: 'es',
    sound: true,
    animations: true,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Cuenta eliminada');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Configuración</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="text-blue-400" size={20} />
              <span className="text-white">Idioma</span>
            </div>
            <select
              value={settings.language}
              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="bg-gray-700 text-white rounded px-2 py-1 text-sm outline-none border border-gray-600 hover:border-gray-500 focus:border-blue-500 transition-colors"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <Volume2 className="text-green-400" size={20} />
              <span className="text-white">Sonido</span>
            </div>
            <button
              onClick={() => handleToggle('sound')}
              className={`w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 ${
                settings.sound ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  settings.sound ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-400" size={20} />
              <span className="text-white">Animaciones</span>
            </div>
            <button
              onClick={() => handleToggle('animations')}
              className={`w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 ${
                settings.animations ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  settings.animations ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-3">
              <Wallet className="text-purple-400" size={20} />
              <span className="text-white">Exchange</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="w-full mt-6 p-3 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <Trash2 size={20} />
            <span>Eliminar cuenta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;