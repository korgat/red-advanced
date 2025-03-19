import React from 'react';

import VideoSection from '@/components/video-section/VideoSection';

import { cn } from '@/lib/utils';
import { videoService } from '@/services/video';

interface VideoGamesSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const VideoGamesSection = async (props: VideoGamesSectionProps) => {
  const { className = '', ...rest } = props;
  const { data } = await videoService.getVideoGames();

  return (
    <VideoSection
      {...rest}
      className={cn('p-layout h-full', {}, [className])}
      heading={{ text: 'Video games' }}
      videos={data.videos}
    />
  );
};

export default VideoGamesSection;
