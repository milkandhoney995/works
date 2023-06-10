'use client';

import Image from 'next/image'
import classes from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react';

export default function MeditationApp() {
  const song = useRef() as React.MutableRefObject<HTMLAudioElement>
  const outline = useRef() as React.MutableRefObject<SVGCircleElement>
  const video = useRef() as React.MutableRefObject<HTMLVideoElement>
  // time display
  const timeDisplay = useRef() as React.MutableRefObject<HTMLHeadingElement>
  useEffect(() => {
    console.log(song)
    console.log(video.current)
    console.log(timeDisplay)
  }, [])
  
  // Duration
  const [fakeDuration, setFakeDuration] = useState<number>(600);
  console.log(fakeDuration)
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimatedNumber
    // get the length of outline
    const outlineLength = outline.current.pathLength.animVal;
    console.log(outlineLength)
    outline.current.style.strokeDasharray = outlineLength.toString();
    outline.current.style.strokeDashoffset = outlineLength.toString();
  }, [])

  function pickDifferentSound() {
    console.log("sound")
  }

  // Stop and play the sound
  function checkPlaying(song: HTMLAudioElement) {
    if (song.paused) {
      song.play();
      // video.play();
      // play.src = "../../assets/svg/pause.svg";
    } else {
      song.pause();
      // video.pause();
      // play.src = "../../assets/svg/play.svg";
    }
  };

  function playSound() {
    console.log("playing")
  }

  // Select sound
  function selectSound(e: React.MouseEvent) {
    const dataTime = e.currentTarget.getAttribute("data-time")
    setFakeDuration(Number(dataTime))
    timeDisplay.current.childNodes[0].textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
  }

  // we can animate the circle
  useEffect(() => {
    const currentSong = song.current

    currentSong.ontimeupdate = () => {
      let currentTime = currentSong.currentTime
      let elapsed = fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);
      // console.log(currentTime)

      // Animate the circle
    }
  }, [])
  // song.current.ontimeupdate = () => {
  //   let currentTime = song.currentTime;
  //   let elapsed = fakeDuration - currentTime;
  //   let seconds = Math.floor(elapsed % 60);
  //   minutes = Math.floor(elapsed / 60);

  //   // Animate the circle
  //   let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  //   outline.style.strokeDashoffset = progress;

  //   // Animate the text
  //   timeDisplay.textContent = `${minutes}:${seconds}`;

  //   if (currentTime >= fakeDuration) {
  //       song.pause();
  //       song.currentTime = 0;
  //       play.src = "./svg/play.svg";
  //       video.pause();
  //   };
  // }
  return (
    <div className={classes.app}>
      <div className={classes.vidContainer}>
        <video className={classes.video} ref={video} loop>
          <source src="../../assets/video/rain.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={classes.timeSelect}>
        <button data-time="10" onClick={(e) => selectSound(e)}>2 Minutes</button>
        <button data-time="300" onClick={(e) => selectSound(e)}>5 Minutes</button>
        <button data-time="600" onClick={(e) => selectSound(e)}>10 Minutes</button>
      </div>
      <div className={classes.playerContainer}>
        <audio className="song" ref={song}>
          <source src="../../../assets/sounds/rain.mp3" />
        </audio>
        <Image
          src={'../../../assets/svg/play.svg'}
          alt="play" className="play"
          width={90}
          height={90}
          onClick={() => playSound()}
        />
        <svg
          className="track-outline"
          width="453"
          height="453"
          viewBox="0 0 453 453"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="226.5"
            cy="226.5"
            r="216.5"
            stroke="white"
            stroke-width="20"
          />
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
            stroke-width="20"
          />
        </svg>
        <h3 className={classes.timeDisplay} ref={timeDisplay}>0:00</h3>
      </div>
      <div className={classes.soundPicker}>
        <button
          data-sound="../../../assets/sounds/rain.mp3"
          data-video="../../assets/video/rain.mp4"
          onClick={() => pickDifferentSound()}
        >
          <Image src={'../../../assets/svg/rain.svg'} width={60} height={60} alt="rain" />
        </button>
        <button
          data-sound="../../../assets/sounds/beach.mp3"
          data-video="../../assets/video/beach.mp4"
          onClick={() => pickDifferentSound()}
        >
          <Image src={'../../../assets/svg/beach.svg'} width={60} height={60} alt="beach" />
        </button>
      </div>
    </div>
  )
}