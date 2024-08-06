import React, { useRef, useEffect, useState } from 'react';

type AudioPlayerProps = {
  src: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div onClick={togglePlayPause} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/4409/4409375.png" // Icon cái loa
        alt="Speaker icon"
        style={{ width: '30px', height: '30px', marginRight: '10px' }}
      />
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
