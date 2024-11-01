import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameNavigation from '../components/GameNavigation';
import Loader from '../components/Loader';

const MineCard = ({ title, earnings, diamonds, time, imageUrl, level }) => (
  <div className="bg-gray-800 rounded-lg p-2 text-center hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
    <div className="bg-gray-700 rounded-lg mb-2 aspect-square relative overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-yellow-400 text-xl font-bold flex items-center gap-2">
            <div className="rounded-full bg-yellow-400/20 p-4">
              {time && (
                <div className="text-sm text-center">
                  <div className="font-mono">{time}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-200">{title}</h3>
        {diamonds && (
          <div className="flex items-center gap-1">
            <span className="text-blue-400">💎</span>
            <span className="text-sm text-gray-200">{diamonds}</span>
          </div>
        )}
      </div>
      {earnings && (
        <div className="text-xs text-gray-400 mt-1">
          Ganancias por hora: {earnings}
        </div>
      )}
      {level && (
        <div className="absolute top-2 left-2 bg-purple-600 rounded-full px-2 py-0.5 text-xs">
          lvl {level}
        </div>
      )}
    </div>
  </div>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
      active 
        ? 'bg-gray-800 text-white' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    {children}
  </button>
);

const MinePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('mine-cards');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
    }, []);
  
    const handleNavigate = (path) => {
      navigate(path);
    };
  
    const tabs = [
      { id: 'mine-cards', label: 'Mis Tortugas' },
      { id: 'new-cards', label: 'Nuevas Tortugas' },
      { id: 'opportunities', label: 'Oportunidades perdidas' }
    ];
  
    const cards = [
      {
        title: 'Governance Token Voting',
        time: '03:56:14',
        diamonds: '0.41',
        level: 2
      },
      {
        title: 'DeFi Integration',
        time: '05:33:33',
        diamonds: '1.07',
        level: 6
      },
      {
        title: 'Stablecoin Launch',
        imageUrl: '/crypto-mining.jpg',
        diamonds: '3.08',
        level: 8
      },
      {
        title: 'Whale Alert',
        time: '03:55:19',
        diamonds: '4.03',
        level: 13
      }
    ];
  
    if (loading) {
      return <Loader />;
    }
  
    return (
      <div className="min-h-screen bg-gray-900 text-white pb-16 relative">
        {/* Tabs */}
        <div className="sticky top-0 z-10 bg-gray-900 p-4 border-b border-gray-800">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>
  
        {/* Cards Grid */}
        <div className="p-4 grid grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <MineCard key={index} {...card} />
          ))}
        </div>
  
        {/* Navigation Component */}
        <GameNavigation onNavigate={handleNavigate} />
      </div>
    );
  };
  
  export default MinePage;