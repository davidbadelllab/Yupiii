import React, { useEffect, useRef } from 'react';

const IntroVoice = () => {
  const audioRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const playIntroVoice = () => {
      if (!hasPlayedRef.current) {
        const audio = new Audio('/audio/vozenoff.mp3');
        audio.volume = 1;
        audioRef.current = audio;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              hasPlayedRef.current = true;
            })
            .catch(error => {
              console.error("Error playing intro voice:", error);
            });
        }
      }
    };

    // Intentar reproducir inmediatamente
    playIntroVoice();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
};

export default IntroVoice;