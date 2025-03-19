'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import React, { type ReactElement, type RefObject, useEffect, useState } from 'react';

import type { HTMLCustomVideoElement } from '../videoPlayer.types';
import { transformVideoDuration } from '../videoPlayer.utils';

import { useSkipTime } from './useSkipTime';
import { cn } from '@/lib/utils';

import './progressbar.scss';

interface IHandleProps {
  value: number;
  dragging: boolean;
  index: number;
}

const handleRender = (node: ReactElement, props: IHandleProps) => {
  const { value, dragging, index } = props;
  return (
    <Tooltip
      prefixCls='rc-slider-tooltip'
      classNames={{ root: 'tooltip-simple-text' }}
      overlay={transformVideoDuration(value)}
      visible={dragging}
      placement='top'
      key={index}
    >
      {node}
    </Tooltip>
  );
};

interface ProgressbarProps extends React.HTMLAttributes<HTMLDivElement> {
  playerRef: RefObject<HTMLCustomVideoElement | null>;
  duration: number;
}

const Progressbar = (props: ProgressbarProps) => {
  const { className = '', playerRef, duration, ...rest } = props;
  const [currentTime, setCurrentTime] = useState(0);
  useSkipTime(playerRef, { setCurrentTime });

  const onSeek = (time: number) => {
    if (!playerRef.current) return;

    playerRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const player = playerRef?.current;

    const updateProgress = () => {
      if (!player) return;
      setCurrentTime(player.currentTime);
    };

    player?.addEventListener('timeupdate', updateProgress);

    return () => {
      player?.removeEventListener('timeupdate', updateProgress);
    };
  }, [playerRef]);

  return (
    <div
      {...rest}
      className={cn('w-full', {}, [className])}
    >
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={value => {
          if (typeof value === 'number') {
            onSeek(value);
          }
        }}
        handleRender={handleRender}
        styles={{
          track: { backgroundColor: 'var(--color-primary)', height: 5 },
          rail: { backgroundColor: 'rgb(196 196 196 / 60%)', height: 5 },
          handle: {
            borderColor: 'transparent',
            height: 16,
            width: 16,
            backgroundColor: 'transparent',
            outline: 'none',
            boxShadow: 'none'
          }
        }}
      />
    </div>
  );
};

export default Progressbar;
