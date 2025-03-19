'use client';

import { Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import Progressbar from './progressbar/Progressbar';
import { QualitySelector } from './quality-selector';
import { useVideoPlayer } from './use-video-player/useVideoPlayer';
import { transformVideoDuration } from './videoPlayer.utils';
import { VolumeControl } from './volume-control';
import { cn } from '@/lib/utils';
import { EnumVideoPlayerQuality } from '@/types/video.types';

interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string;
  maxResolution: EnumVideoPlayerQuality;
  toggleTheatreMode: () => void;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { className = '', fileName, maxResolution, toggleTheatreMode, ...rest } = props;
  const { fn, playerRef, state } = useVideoPlayer({ fileName, maxResolution });

  useHotkeys('c', e => {
    e.preventDefault();
    toggleTheatreMode();
  });

  return (
    <div
      {...rest}
      className={cn('relative rounded-lg overflow-hidden', {}, [className])}
    >
      <video
        ref={playerRef}
        className='w-full h-full aspect-video'
        controls={false}
        src={`/uploads/videos/${maxResolution}/${fileName}`}
        preload='metadata'
        onClick={() => fn.togglePlayPause()}
      />

      <div className='flex items-center justify-between gap-5 p-3 absolute bottom-0 left-0 right-0'>
        <div className='flex items-center gap-2 w-full'>
          <button
            onClick={fn.togglePlayPause}
            className='transition-colors hover:text-primary'
          >
            {state.isPlaying ? <Pause /> : <Play />}
          </button>
          <div className='mr-3'>
            <span>{transformVideoDuration(state.duration)}</span>
          </div>
          <Progressbar
            playerRef={playerRef}
            duration={state.duration}
          />
        </div>
        <div className='flex items-center gap-3'>
          <QualitySelector
            maxResolution={maxResolution}
            currentQuality={state.quality}
            setQuality={fn.changeQuality}
          />
          <VolumeControl playerRef={playerRef} />
          <button
            onClick={() => toggleTheatreMode()}
            className='transition-colors hover:text-primary'
          >
            <RectangleHorizontal />
          </button>
          <button
            onClick={fn.toggleFullScreen}
            className='transition-colors hover:text-primary'
          >
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
