import { useEffect, useRef, useState } from 'react';

export function useMeditationTimer(fakeDuration: number) {
  const song = useRef<HTMLAudioElement>(null);
  const outline = useRef<SVGCircleElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const timeDisplay = useRef<HTMLHeadingElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!outline.current) return;

    const outlineLength = outline.current.getTotalLength();
    outline.current.style.strokeDasharray = outlineLength.toString();
    outline.current.style.strokeDashoffset = outlineLength.toString();
  }, []);

  useEffect(() => {
    const currentSong = song.current;
    if (!currentSong) return;

    const onTimeUpdate = () => {
      const currentTime = currentSong.currentTime;
      const elapsed = fakeDuration - currentTime;
      const minutes = Math.floor(elapsed / 60);
      const seconds = Math.floor(elapsed % 60);

      if (timeDisplay.current) {
        timeDisplay.current.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      const progress = outline.current?.getTotalLength() || 0;
      const offset = progress - (currentTime / fakeDuration) * progress;
      if (outline.current) {
        outline.current.style.strokeDashoffset = offset.toString();
      }

      if (currentTime >= fakeDuration) {
        currentSong.pause();
        currentSong.currentTime = 0;
        setIsPlaying(false);
        if (video.current) {
          video.current.pause();
        }
      }
    };

    const onLoadedMetadata = () => {
      if (timeDisplay.current) {
        const minutes = Math.floor(fakeDuration / 60);
        const seconds = Math.floor(fakeDuration % 60);
        timeDisplay.current.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    };

    currentSong.addEventListener('timeupdate', onTimeUpdate);
    currentSong.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      currentSong.removeEventListener('timeupdate', onTimeUpdate);
      currentSong.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [fakeDuration]);

  const playPause = () => {
    const currentSong = song.current;
    const currentVideo = video.current;
    if (!currentSong || !currentVideo) return;

    if (isPlaying) {
      currentSong.pause();
      currentVideo.pause();
    } else {
      currentSong.play();
      currentVideo.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restartSong = () => {
    const currentSong = song.current;
    const currentVideo = video.current;
    if (!currentSong || !currentVideo) return;

    currentSong.currentTime = 0;
    currentVideo.currentTime = 0;
    if (timeDisplay.current) {
      const minutes = Math.floor(fakeDuration / 60);
      const seconds = Math.floor(fakeDuration % 60);
      timeDisplay.current.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    if (outline.current) {
      const progress = outline.current.getTotalLength();
      outline.current.style.strokeDashoffset = progress.toString();
    }
  };

  return {
    song,
    outline,
    video,
    timeDisplay,
    isPlaying,
    playPause,
    restartSong,
  };
}