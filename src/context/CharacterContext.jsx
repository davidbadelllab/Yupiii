import React, { createContext, useContext, useState } from 'react';

const CharacterContext = createContext(undefined);

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState({
    id: 1,
    image: "/img/1.jpg"
  });

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter debe usarse dentro de CharacterProvider');
  }
  return context;
};