import React, { useState, useEffect } from 'react';
import GameNavigation from '../components/GameNavigation';
import { Share2, RefreshCw } from 'lucide-react';
import Loader from '../components/Loader';

const InviteOption = ({ icon, title, reward, isPremium }) => (
  <button className="w-full bg-gray-800 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-700 transition-all mb-2">
    <div className="w-10 h-10 flex-shrink-0">
      <img src="/img/gift-box.png" alt="Gift" className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 text-left">
      <h3 className="text-white text-sm">{title}</h3>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-blue-400">💎</span>
        <span className="text-gray-400 text-sm">+{reward} para tí y tu amigo</span>
      </div>
    </div>
  </button>
);

const FriendItem = ({ name, avatar }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg mb-2">
    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
      <img 
        src={avatar || "/img/default-avatar.png"} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-gray-200 flex-1">{name}</span>
  </div>
);

const Friends = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([
    { id: 1, name: 'David Badell', avatar: '/img/avatar1.png' },
    { id: 2, name: 'jose alfaro', avatar: '/img/avatar2.png' },
    { id: 3, name: 'Ramon Garcia', avatar: '/img/avatar3.png' },
  ]);

  useEffect(() => {
    // Simulamos una carga de datos
    const loadData = async () => {
      try {
        // Aquí podrías hacer una llamada a API real
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Aquí podrías hacer una llamada a API real para refrescar los datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simular actualización de datos
      setFriends(prevFriends => [...prevFriends]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <div className="max-w-md mx-auto p-4">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">¡Invita amigos!</h1>
          <p className="text-gray-400">Tú y un amigo recibirán bonos</p>
        </div>

        {/* Invite Options */}
        <div className="mb-6">
          <InviteOption
            title="Invitar amigo"
            reward="0,1"
          />
          <InviteOption
            title="Invitar amigo con Telegram Premium"
            reward="0,3"
            isPremium
          />
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 hover:bg-blue-700 transition-all">
            Conviértete en un referido
          </button>
        </div>

        {/* Friends List */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Lista de tus amigos (27)</h2>
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-800 rounded-full transition-all"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-2">
            {friends.map((friend) => (
              <FriendItem key={friend.id} {...friend} />
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
          <div className="max-w-md mx-auto flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
              <Share2 className="w-5 h-5" />
              Invitar amigo
            </button>
            <button className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all">
              <svg 
                className="w-6 h-6 text-gray-400"
                fill="none" 
                strokeWidth="2" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <GameNavigation />
      </div>
    </div>
  );
};

export default Friends;