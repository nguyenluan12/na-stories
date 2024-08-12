// // AudioManager.ts
// class AudioManager {
//     private static instance: AudioManager;
//     private audioRefs: Set<HTMLAudioElement>;
  
//     private constructor() {
//       this.audioRefs = new Set();
//     }
  
//     public static getInstance(): AudioManager {
//       if (!AudioManager.instance) {
//         AudioManager.instance = new AudioManager();
//       }
//       return AudioManager.instance;
//     }
  
//     public registerAudio(audio: HTMLAudioElement) {
//       this.audioRefs.add(audio);
//     }
  
//     public unregisterAudio(audio: HTMLAudioElement) {
//       this.audioRefs.delete(audio);
//     }
  
//     public pauseAll() {
//       this.audioRefs.forEach(audio => {
//         audio.pause();
//       });
//     }
//   }
  
//   export default AudioManager.getInstance();
  