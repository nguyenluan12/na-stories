// context/AudioContext.tsx

import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext<{
  playingAudioId: string | null;
  setPlayingAudioId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  playingAudioId: null,
  setPlayingAudioId: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  return (
    <AudioContext.Provider value={{ playingAudioId, setPlayingAudioId }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
