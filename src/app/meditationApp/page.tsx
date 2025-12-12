'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classes from './page.module.scss';

export default function MeditationApp() {
  const song = useRef<HTMLAudioElement>(null);
  const outline = useRef<SVGCircleElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const timeDisplay = useRef<HTMLHeadingElement>(null);

  const [fakeDuration, setFakeDuration] = useState<number>(600);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!outline.current) return;

    const outlineLength = outline.current.getTotalLength();
    outline.current.style.strokeDasharray = outlineLength.toString();
    outline.current.style.strokeDashoffset = outlineLength.toString();

    const currentSong = song.current;
    if (!currentSong) return;

    const onTimeUpdate = () => {
      const currentTime = currentSong.currentTime;
      const elapsed = fakeDuration - currentTime;
      const minutes = Math.floor(elapsed / 60);
      const seconds = Math.floor(elapsed % 60);

      const progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.current!.style.strokeDashoffset = progress.toString();

      if (timeDisplay.current) {
        timeDisplay.current.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }

      if (currentTime >= fakeDuration) {
        currentSong.pause();
        currentSong.currentTime = 0;
        video.current?.pause();
        setIsPlaying(false);
      }
    };

    currentSong.addEventListener('timeupdate', onTimeUpdate);
    return () => currentSong.removeEventListener('timeupdate', onTimeUpdate);
  }, [fakeDuration]);

  const togglePlay = () => {
    if (!song.current || !video.current) return;

    if (song.current.paused) {
      song.current.play();
      video.current.play();
      setIsPlaying(true);
    } else {
      song.current.pause();
      video.current.pause();
      setIsPlaying(false);
    }
  };

  const selectSound = (soundSrc: string, videoSrc: string, duration: number) => {
    if (!song.current || !video.current) return;

    song.current.src = soundSrc;
    video.current.src = videoSrc;
    setFakeDuration(duration);
    song.current.currentTime = 0;
    video.current.currentTime = 0;

    if (timeDisplay.current) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      timeDisplay.current.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    if (isPlaying) {
      song.current.play();
      video.current.play();
    }
  };

  return (
    <div className={classes.app}>
      <div className={classes.vidContainer}>
        <video className={classes.video} ref={video} loop />
      </div>

      <div className={classes.timeSelect}>
        <button onClick={() => selectSound(song.current?.src || '', video.current?.src || '', 120)}>2 Minutes</button>
        <button onClick={() => selectSound(song.current?.src || '', video.current?.src || '', 300)}>5 Minutes</button>
        <button onClick={() => selectSound(song.current?.src || '', video.current?.src || '', 600)}>10 Minutes</button>
      </div>

      <div className={classes.playerContainer}>
        <audio ref={song} />
        <Image
          src={isPlaying ? '/assets/svg/pause.svg' : '/assets/svg/play.svg'}
          alt="play"
          width={90}
          height={90}
          className="play"
          onClick={togglePlay}
        />
        <svg
          className="track-outline"
          width="453"
          height="453"
          viewBox="0 0 453 453"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="226.5" cy="226.5" r="216.5" stroke="white" strokeWidth="20" />
        </svg>
        <svg
          className="moving-outline"
          width="453"
          height="453"
          viewBox="0 0 453 453"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle ref={outline} cx="226.5" cy="226.5" r="216.5" stroke="#018EBA" strokeWidth="20" />
        </svg>
        <h3 className={classes.timeDisplay} ref={timeDisplay}>0:00</h3>
      </div>

      <div className={classes.soundPicker}>
        <button onClick={() => selectSound('/assets/sounds/rain.mp3', '/assets/video/rain.mp4', 600)}>
          <Image src="/assets/svg/rain.svg" width={60} height={60} alt="rain" />
        </button>
        <button onClick={() => selectSound('/assets/sounds/beach.mp3', '/assets/video/beach.mp4', 600)}>
          <Image src="/assets/svg/beach.svg" width={60} height={60} alt="beach" />
        </button>
      </div>
    </div>
  );
}