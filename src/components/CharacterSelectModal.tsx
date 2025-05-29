"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CharacterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterSelectModal = ({ isOpen, onClose }: CharacterSelectModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Seleccionar Personaje</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Character Grid */}
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="relative w-full pb-[100%] rounded-lg overflow-hidden bg-gray-800/50">
                    <img
                      src="/img/personaje.png"
                      alt={`Character ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-xs text-white font-medium">Personaje {index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Progress Ring */}
                  <svg
                    className="absolute -inset-1"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-purple-500/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${(index + 1) * 50} 1000`}
                      className="text-purple-500"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};