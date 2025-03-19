import { type Dispatch, type RefObject, type SetStateAction, useState } from 'react';

import { type HTMLCustomVideoElement, defaultVideoQuality } from '../videoPlayer.types';

import type { EnumVideoPlayerQuality } from '@/types/video.types';

interface Props {
  fileName: string;
  playerRef: RefObject<HTMLCustomVideoElement | null>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  maxResolution: EnumVideoPlayerQuality;
}

export const useQuality = ({ playerRef, fileName, maxResolution, setIsPlaying }: Props) => {
  const [quality, setQuality] = useState(maxResolution || defaultVideoQuality);

  const changeQuality = (quality: EnumVideoPlayerQuality) => {
    if (!playerRef.current) return;
    setQuality(quality);
    const lastTime = playerRef.current.currentTime;

    playerRef.current.src = `/uploads/videos/${quality}/${fileName}`;
    playerRef.current.currentTime = lastTime;
    playerRef.current.play();
    setIsPlaying(true);
  };
  return { changeQuality, quality };
};
