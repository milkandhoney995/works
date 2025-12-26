'use client';

import { useState } from 'react';
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
    addTime,
    selectSound,
    changeDuration,
  } = useMeditationTimer(600);

  /* ---------- 設定モーダル ---------- */
  const [isOpen, setIsOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(10);

  const applyCustomTime = () => {
    changeDuration(customMinutes * 60);
    setIsOpen(false);
  };

  return (
    <div className={classes.meditation}>
      <div className={classes.meditation__background}>
        <video ref={video} className={classes.meditation__backgroundVideo} loop />
      </div>

      {/* 左：時間選択 */}
      <div className={`${classes.meditation__column} ${classes.meditation__timeSelector}`}>
        <button onClick={() => changeDuration(120)}>2 Minutes</button>
        <button onClick={() => changeDuration(300)}>5 Minutes</button>
        <button onClick={() => changeDuration(600)}>10 Minutes</button>
        <button onClick={() => changeDuration(900)}>15 Minutes</button>
        <button onClick={() => setIsOpen(true)}>Setting</button>
      </div>

      {/* 中央：プレイヤー */}
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
        <svg
          className={classes.meditation__track}
          width="453"
          height="453"
          viewBox="0 0 453 453"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="226.5" cy="226.5" r="216.5" stroke="white" strokeWidth="20" />
        </svg>
        <svg
          className={classes.meditation__progress}
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

      {/* 右：サウンド */}
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

      {/* モーダル */}
      {isOpen && (
        <div className={classes.meditation__modalOverlay}>
          <div className={classes.meditation__modal}>
            <h2>時間設定（分）</h2>
            <input
              type="number"
              min={1}
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Number(e.target.value))}
            />
            <div className={classes.meditation__modalActions}>
              <button onClick={applyCustomTime}>設定</button>
              <button onClick={() => setIsOpen(false)}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeditationApp;