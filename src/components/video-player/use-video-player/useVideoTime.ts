import { type RefObject, useEffect, useState } from 'react';

import type { HTMLCustomVideoElement } from '../videoPlayer.types';

export const useVideoTime = (playerRef: RefObject<HTMLCustomVideoElement | null>) => {
  const [duration, setDuration] = useState(0.0);

  useEffect(() => {
    if (!playerRef?.current) return;
    const playerEl = playerRef.current;

    const handleLoadedMetadata = () => {
      setDuration(playerEl.duration);
    };
    setDuration(isNaN(playerEl.duration) ? 0.0 : playerEl.duration);
    playerEl.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      playerEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [playerRef]);
  return { duration };
};
