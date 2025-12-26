'use client';

import Image from 'next/image';
import classes from './page.module.scss';
import { useMeditationTimer } from '@/hooks/useMeditationTimer';

const MeditationApp = () => {
  const {
    song,
    video,
    outline,
    isPlaying,
    minutes,
    seconds,
    playPause,
    selectSound,
    changeDuration,
  } = useMeditationTimer(600);

  return (
    <div className={classes.app}>
      <div className={classes.vidContainer}>
        <video ref={video} className={classes.video} loop />
      </div>

      {/* 時間選択 */}
      <div className={classes.timeSelect}>
        <button onClick={() => changeDuration(120)}>2 Minutes</button>
        <button onClick={() => changeDuration(300)}>5 Minutes</button>
        <button onClick={() => changeDuration(600)}>10 Minutes</button>
        <button onClick={() => changeDuration(900)}>15 Minutes</button>
      </div>

      {/* プレイヤー */}
      <div className={classes.playerContainer}>
        <audio ref={song} />
        <Image
          src={isPlaying ? '/assets/svg/pause.svg' : '/assets/svg/play.svg'}
          alt="play"
          width={90}
          height={90}
          className="play"
          onClick={playPause}
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
          <circle
            ref={outline}
            cx="226.5"
            cy="226.5"
            r="216.5"
            stroke="#018EBA"
            strokeWidth="20"
          />
        </svg>
        <h3 className={classes.timeDisplay}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </h3>
      </div>

      {/* サウンド */}
      <div className={classes.soundPicker}>
        <button
          onClick={() =>
            selectSound('/assets/sounds/rain.mp3', '/assets/video/rain.mp4', 600)
          }
        >
          <Image src="/assets/svg/rain.svg" width={60} height={60} alt="rain" />
        </button>

        <button
          onClick={() =>
            selectSound('/assets/sounds/beach.mp3', '/assets/video/beach.mp4', 600)
          }
        >
          <Image src="/assets/svg/beach.svg" width={60} height={60} alt="beach" />
        </button>
      </div>
    </div>
  );
}

export default MeditationApp;