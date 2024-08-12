import React, { useRef, useState } from 'react';

type AudioPlayerProps = {
  src: string;
  isAudioPlaying: boolean;
  setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isAudioPlaying, setIsAudioPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(isAudioPlaying)
  const togglePlayPause = () => {
    if (!isAudioPlaying) {
      if (audioRef.current) {
        if (!isPlaying) {
        //   audioRef.current.pause();
        //   setIsAudioPlaying(false);
       
          audioRef.current.play();
          setIsAudioPlaying(true);
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleOnEnded = () => {
    setIsAudioPlaying(false);
    setIsPlaying(false);
  };

  return (
    <div onClick={togglePlayPause} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/4409/4409375.png" // Icon cái loa
        alt={isPlaying ? "Click to pause audio" : "Click to play audio"}
        style={{ width: '30px', height: '30px', marginRight: '10px' }}
      />
      <audio ref={audioRef} src={src} onEnded={handleOnEnded} />
    </div>
  );
};

export default AudioPlayer;
