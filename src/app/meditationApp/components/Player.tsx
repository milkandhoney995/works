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
  return (
    <div className={classes.meditation__player}>
      <audio ref={song} />
      <Image
        src={isPlaying ? '/assets/svg/pause.svg' : '/assets/svg/play.svg'}
        alt="play"
        width={90}
        height={90}
        className={classes.meditation__playButton}
        onClick={playPause}
      />

      <CircleProgress type="track" />
      <CircleProgress type="progress" ref={outline} />

      <button
        className={classes.meditation__addTimeButton}
        onClick={() => addTime(60)}
      >
        ＋1分
      </button>

      <h3 className={classes.meditation__timeDisplay}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </h3>
    </div>
  );
};

export default Player;