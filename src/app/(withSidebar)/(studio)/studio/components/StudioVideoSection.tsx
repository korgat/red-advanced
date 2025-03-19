import type { LucideIcon } from 'lucide-react';
import React from 'react';

import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader';
import VideoNotFound from '@/ui/video-not-found/VideoNotFound';

import StudioVideoItem from './studioVideoItem/StudioVideoItem';
import { cn } from '@/lib/utils';
import type { IFullVideo } from '@/types/video.types';

interface StudioVideoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: {
    text: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    icon?: LucideIcon;
  };
  isLoading: boolean;
  videos: IFullVideo[];
}

const StudioVideoSection = (props: StudioVideoSectionProps) => {
  const { className = '', heading, isLoading, videos, ...rest } = props;

  return (
    <section
      {...rest}
      className={cn('', {}, [className])}
    >
      <Heading
        className='mb-0'
        tag={heading.tag}
        icon={heading.icon}
      >
        {heading.text}
      </Heading>

      {isLoading && (
        <div className={cn('grid grid-cols-6 gap-5 mt-4')}>
          <SkeletonLoader
            className={cn('h-44 rounded-lg')}
            count={6}
          />
        </div>
      )}
      {!isLoading && (
        <div
          {...rest}
          className='flex flex-col gap-3 mt-4'
        >
          {videos.length ? (
            videos.map(video => (
              <StudioVideoItem
                key={video.id}
                item={video}
              />
            ))
          ) : (
            <VideoNotFound className='h-full' />
          )}
        </div>
      )}
    </section>
  );
};

export default StudioVideoSection;
