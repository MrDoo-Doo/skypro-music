'use client';

import Link from 'next/link';
import cn from 'classnames';
import styles from './bar.module.css';
import { useAppSelector } from '@/store/store';
import { useRef, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleSuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { getTimePanel } from '@/utils/helpers';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLoop, setIsLoop] = useState(false);
  const [volumeLvl, setVolumeLvl] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [trackTime, setTrackTime] = useState(0);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);

  const playPauseTrack = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
        dispatch(setIsPlay(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlay(true));
      }
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setTrackTime(audioRef.current.duration);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(false);
    }
  };

  const onLoadStart = () => {
    // setIsLoadedTrack(true);
  };

  const onChangeProgress = (
    e: React.ChangeEvent<HTMLInputElement, Element>,
  ) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleSuffle = () => {
    dispatch(toggleSuffle());
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeLvl;
    }
  }, [volumeLvl]);

  if (!currentTrack) {
    return <></>;
  }

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        loop={isLoop}
        onLoadStart={onLoadStart}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onNextTrack}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={trackTime || 0}
          value={progress}
          step={0.01}
          onChange={onChangeProgress}
          readOnly
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={cn(styles.player__btnPrev, styles.btnIcon)}
                onClick={onPrevTrack}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={cn(
                  styles.player__btnPlay,
                  styles.btn,
                  styles.btnIcon,
                )}
                onClick={playPauseTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  {isPlay ? (
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  ) : (
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  )}
                </svg>
              </div>
              <div
                className={cn(styles.player__btnNext, styles.btnIcon)}
                onClick={onNextTrack}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={cn(styles.player__btnRepeat, styles.btnIcon)}
                onClick={onToggleLoop}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={cn(styles.player__btnShuffle, styles.btnIcon)}
                onClick={onToggleSuffle}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>
            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {isLoadedTrack ? 'Загрузка...' : currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {isLoadedTrack ? 'Загрузка...' : currentTrack.author}
                  </Link>
                </div>
              </div>
              <div className={styles.trackPlay__dislike}>
                <div className={cn(styles.player__btnShuffle, styles.btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={cn(styles.trackPlay__dislike, styles.btnIcon)}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={cn(styles.volume__progress, styles.btn)}>
                <input
                  className={cn(styles.volume__progressLine, styles.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volumeLvl}
                  onChange={(e) => setVolumeLvl(Number(e.target.value))}
                />
              </div>
            </div>
            <p className={styles.bar__timeText}>
              {getTimePanel(progress, trackTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
