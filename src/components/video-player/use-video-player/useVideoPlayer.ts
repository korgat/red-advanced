import { useRef } from 'react';

import { type HTMLCustomVideoElement } from '../videoPlayer.types';

import { useFullScreen } from './useFullScreen';
import { usePlayPause } from './usePlayPause';
import { useQuality } from './useQuality';
import { useVideoTime } from './useVideoTime';
import type { EnumVideoPlayerQuality } from '@/types/video.types';

interface Props {
  fileName: string;
  maxResolution: EnumVideoPlayerQuality;
}

export function useVideoPlayer({ fileName, maxResolution }: Props) {
  const playerRef = useRef<HTMLCustomVideoElement>(null);

  const { isPlaying, setIsPlaying, togglePlayPause } = usePlayPause(playerRef);
  const { quality, changeQuality } = useQuality({
    fileName,
    playerRef,
    maxResolution,
    setIsPlaying
  });
  const { duration } = useVideoTime(playerRef);
  const { toggleFullScreen } = useFullScreen(playerRef);

  return {
    state: {
      isPlaying,
      duration,
      quality
    },
    fn: {
      togglePlayPause,
      changeQuality,
      toggleFullScreen
    },
    playerRef
  };
}
