// Sound utility for playing audio effects
// Replace these URLs with your actual sound file paths

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    // Initialize sound effects
    // You can replace these with actual sound file URLs
    this.loadSound('drag', this.createDragSound());
    this.loadSound('sizzle', this.createSizzleSound());
  }

  private loadSound(name: string, audio: HTMLAudioElement) {
    this.sounds.set(name, audio);
  }

  // Create a simple drag sound using Web Audio API
  private createDragSound(): HTMLAudioElement {
    // Placeholder: You can replace this with an actual audio file
    // Example: return new Audio('/sounds/drag.mp3');
    const audio = new Audio();
    audio.volume = 0.3;
    return audio;
  }

  // Create a sizzle/stir-fry sound
  private createSizzleSound(): HTMLAudioElement {
    // Placeholder: You can replace this with an actual audio file
    // Example: return new Audio('/sounds/sizzle.mp3');
    const audio = new Audio();
    audio.volume = 0.5;
    return audio;
  }

  play(soundName: string) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      // Reset to start and play
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  }

  // Use Web Audio API to create a simple beep/whoosh sound for dragging
  playDragSound() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  // Use Web Audio API to create a sizzling sound
  playSizzleSound() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a noise buffer for sizzling effect
    const bufferSize = audioContext.sampleRate * 0.8; // 0.8 seconds
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill with noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;

    // Create filter for sizzle effect
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 1;

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    noise.start(audioContext.currentTime);
    noise.stop(audioContext.currentTime + 0.8);
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
