'use client';

import { Volume1, Volume2, VolumeX } from 'lucide-react';
import React, { type RefObject, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import type { HTMLCustomVideoElement } from '../videoPlayer.types';

import { cn } from '@/lib/utils';

import style from './volumeControl.module.scss';

interface VolumeControlProps extends React.HTMLAttributes<HTMLDivElement> {
  playerRef: RefObject<HTMLCustomVideoElement | null>;
}

const VolumeControl = (props: VolumeControlProps) => {
  const { className = '', playerRef, ...rest } = props;
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const onChangeVolume = (value: number) => {
    const player = playerRef?.current;
    if (!player) return;

    player.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  };

  const onMuteClick = () => {
    const player = playerRef?.current;
    if (!player) return;
    const mutedStatus = player.muted;
    player.muted = !mutedStatus;
    setIsMuted(!mutedStatus);
  };

  useHotkeys('up', e => {
    e.preventDefault();
    onChangeVolume(Math.min(volume + 0.1, 1));
  });

  useHotkeys('down', e => {
    e.preventDefault();
    onChangeVolume(Math.max(volume - 0.1, 0));
  });

  useHotkeys('m', e => {
    e.preventDefault();
    onMuteClick();
  });

  return (
    <div
      {...rest}
      className={cn('flex items-center gap-1', {}, [className])}
    >
      <button
        className='transition-colors hover:text-primary'
        onClick={onMuteClick}
      >
        {isMuted ? <VolumeX /> : volume < 0.4 ? <Volume1 /> : <Volume2 />}
      </button>

      <input
        type='range'
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={e => onChangeVolume(parseFloat(e.target.value))}
        className={style['volume-slider']}
        style={{
          background: `linear-gradient(to right, white ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%)`
        }}
      />
    </div>
  );
};

export default VolumeControl;
