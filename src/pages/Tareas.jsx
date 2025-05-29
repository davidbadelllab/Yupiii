import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameNavigation from '../components/GameNavigation';
import Loader from '../components/Loader';
import { Youtube, MessageCircle, Twitter, Users } from 'lucide-react';

const TaskHeader = () => (
  <div className="text-center mb-8">
    <div className="w-24 h-24 mx-auto mb-4 relative">
      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="relative flex items-center justify-center h-full">
        <svg
          viewBox="0 0 24 24"
          className="w-16 h-16 text-blue-500"
          fill="currentColor"
        >
          <path d="M12 2L2 19.5h20L12 2zm0 4l6.5 11h-13L12 6z" />
        </svg>
      </div>
    </div>
    <h1 className="text-2xl font-bold mb-2">Gana más cristales</h1>
  </div>
);

const YouTubeTask = ({ title, reward, completed }) => (
  <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-4 mb-3">
    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0">
      <Youtube className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-200">{title}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-blue-400">💎</span>
        <span className="text-sm text-gray-400">+{reward}</span>
      </div>
    </div>
    {completed && (
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}
    {!completed && (
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </div>
);

const SocialTask = ({ icon: Icon, title, reward, completed }) => (
  <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-4 mb-3">
    <div className={`w-10 h-10 rounded-lg ${completed ? 'bg-green-600' : 'bg-gray-700'} flex items-center justify-center flex-shrink-0`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-200">{title}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-blue-400">💎</span>
        <span className="text-sm text-gray-400">+{reward}</span>
      </div>
    </div>
    {completed && (
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}
  </div>
);

const Tareas = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga inicial
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const youtubeTasks = [
    {
      title: '¡Nuevas y divertidas maneras de ahorrar dinero!',
      reward: '1',
      completed: false
    },
    {
      title: '¿Humanoides superarán en número a las personas?',
      reward: '1',
      completed: true
    }
  ];

  const socialTasks = [
    {
      icon: MessageCircle,
      title: 'Únete a nuestro canal TG',
      reward: '1',
      completed: true
    },
    {
      icon: Twitter,
      title: 'Sigue nuestra cuenta X',
      reward: '1',
      completed: true
    },
    {
      icon: Users,
      title: 'Invite 3 friends',
      reward: '3',
      completed: true
    }
  ];
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <div className="max-w-md mx-auto p-4">
        <TaskHeader />

        {/* YouTube Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Elemnts Youtube</h2>
          {youtubeTasks.map((task, index) => (
            <YouTubeTask key={index} {...task} />
          ))}
        </div>

        {/* Tasks List */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Lista de tareas</h2>
          {socialTasks.map((task, index) => (
            <SocialTask key={index} {...task} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <GameNavigation />
    </div>
  );
};

export default Tareas;