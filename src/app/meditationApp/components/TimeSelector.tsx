'use client';

import React from 'react';
import classes from '@/app/meditationApp/page.module.scss'

interface Props {
  changeDuration: (seconds: number) => void;
  openSettings: () => void;
}

const TimeSelector = ({ changeDuration, openSettings }: Props) => (
  <div className={`${classes.meditation__column} ${classes.meditation__timeSelector}`}>
    <button onClick={() => changeDuration(120)}>2 Minutes</button>
    <button onClick={() => changeDuration(300)}>5 Minutes</button>
    <button onClick={() => changeDuration(600)}>10 Minutes</button>
    <button onClick={() => changeDuration(900)}>15 Minutes</button>
    <button onClick={openSettings}>Setting</button>
  </div>
);

export default TimeSelector;