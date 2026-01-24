export interface SoundOption {
  id: string;
  sound: string;
  video: string;
  duration: number;
  icon: string;
  alt: string;
  styleClass: string;
}

export const soundOptions: SoundOption[] = [
  {
    id: 'rain',
    sound: '/assets/sounds/rain.mp3',
    video: '/assets/video/rain.mp4',
    duration: 600,
    icon: '/assets/svg/rain.svg',
    alt: 'rain',
    styleClass: '--rain',
  },
  {
    id: 'beach',
    sound: '/assets/sounds/beach.mp3',
    video: '/assets/video/beach.mp4',
    duration: 600,
    icon: '/assets/svg/beach.svg',
    alt: 'beach',
    styleClass: '--beach',
  },
  // 新しいサウンドはここに追加可能
];