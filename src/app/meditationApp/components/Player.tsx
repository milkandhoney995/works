'use client';

import React from 'react';
import Image from 'next/image';
import classes from '@/app/meditationApp/page.module.scss';
import CircleProgress from './CircleProgress';

interface Props {
  song: React.RefObject<HTMLAudioElement | null>;
  outline: React.RefObject<SVGCircleElement | null>;
  isPlaying: boolean;
  minutes: number;
  seconds: number;
  playPause: () => void;
  addTime: (sec: number) => void;
}

const Player = ({
  song,
  outline,
  isPlaying,
  minutes,
  seconds,
  playPause,
  addTime,
}: Props) => {
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={classes.meditation__player}>
      <audio ref={song} aria-hidden="true" />
      <button
        onClick={playPause}
        aria-label={isPlaying ? '一時停止' : '再生'}
        className={classes.meditation__playButton}
      >
        <Image
          src={isPlaying ? '/assets/svg/pause.svg' : '/assets/svg/play.svg'}
          alt=""
          width={90}
          height={90}
        />
      </button>

      <CircleProgress type="track" />
      <CircleProgress type="progress" ref={outline} />

      <button
        className={classes.meditation__addTimeButton}
        onClick={() => addTime(60)}
        aria-label="1分追加"
      >
        ＋1分
      </button>

      <div
        className={classes.meditation__timeDisplay}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        {timeString}
      </div>
    </div>
  );
};

export default Player;