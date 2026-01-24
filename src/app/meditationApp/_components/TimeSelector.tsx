'use client';

import { memo } from 'react';
import classes from '@/app/meditationApp/page.module.scss';
import { timeOptions } from '../_data/timeOptions';

interface Props {
  changeDuration: (seconds: number) => void;
  openSettings: () => void;
}

// 不必要な再レンダリングを防ぐために memo を使用
const TimeSelector = memo(({ changeDuration, openSettings }: Props) => {
  return (
    <div className={classes.meditation__timeSelector} role="group" aria-label="時間選択">
      {timeOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => changeDuration(option.duration)}
          aria-label={`${option.label}を選択`}
        >
          {option.label}
        </button>
      ))}
      <button onClick={openSettings} aria-label="カスタム時間を設定">Setting</button>
    </div>
  );
});

TimeSelector.displayName = 'TimeSelector';

export default TimeSelector;