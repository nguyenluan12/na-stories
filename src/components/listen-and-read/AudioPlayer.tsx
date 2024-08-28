import React, { useRef, useEffect, useState } from 'react';

type AudioPlayerProps = {
  src: string;
  isAudioPlaying:boolean;
  setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src,isAudioPlaying,setIsAudioPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(!isAudioPlaying){
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsAudioPlaying(true);
    }
  }
    // Cleanup effect: pause the audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsAudioPlaying(false)
      }
    };
  }, []);

  const togglePlayPause = () => {
    if(!isAudioPlaying){
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false)
      } else {
        audioRef.current.play();
        setIsAudioPlaying(true)
      }
      setIsPlaying(!isPlaying);
    }
  }};

  return (
    <div onClick={togglePlayPause} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <img
        className='w-6 max-w-6 min-w-6 mr-2'
        src={"/img/icons8-speaker-stop.png" }
        alt={isPlaying ? "Click to pause audio" : "Click to play audio"}
        
      />
      
      <audio ref={audioRef} src={src} onEnded={()=>setIsAudioPlaying(false)}/>
    </div>
  );
};

export default AudioPlayer;
