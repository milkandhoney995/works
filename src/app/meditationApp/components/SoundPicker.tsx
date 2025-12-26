'use client';

import React from 'react';
import Image from 'next/image';
import classes from '@/app/meditationApp/page.module.scss'

interface Props {
  selectSound: (sound: string, video: string, duration: number) => void;
}

const SoundPicker = ({ selectSound }: Props) => (
  <div className={classes.meditation__column}>
    <button
      className={`${classes.meditation__soundButton} ${classes.meditation__soundButtonRain}`}
      onClick={() =>
        selectSound('/assets/sounds/rain.mp3', '/assets/video/rain.mp4', 600)
      }
    >
      <Image src="/assets/svg/rain.svg" width={60} height={60} alt="rain" />
    </button>

    <button
      className={`${classes.meditation__soundButton} ${classes.meditation__soundButtonBeach}`}
      onClick={() =>
        selectSound('/assets/sounds/beach.mp3', '/assets/video/beach.mp4', 600)
      }
    >
      <Image src="/assets/svg/beach.svg" width={60} height={60} alt="beach" />
    </button>
  </div>
);

export default SoundPicker;