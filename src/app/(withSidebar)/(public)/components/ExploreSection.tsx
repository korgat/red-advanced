'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Compass } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { useSelector } from 'react-redux';

import VideoSection from '@/components/video-section/VideoSection';

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader';

import { selectUser } from '@/store/auth/auth.selectors';

import { useScrollEndPage } from '@/hooks/useScrollEndPage';

import { cn } from '@/lib/utils';
import { videoService } from '@/services/video';

interface ExploreSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const ExploreSection = (props: ExploreSectionProps) => {
  const { className = '', ...rest } = props;
  const user = useSelector(selectUser);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['explore'],
    queryFn: ({ pageParam }) =>
      videoService.getExploreVideos(
        user?.id,
        {
          page: pageParam.page,
          limit: 12
        },
        pageParam.excludeIds
      ),
    initialPageParam: { page: 1, excludeIds: [] as string[] },
    getNextPageParam: (lastPage, allPages) => {
      const { page, totalPages } = lastPage.data;
      const allVideoIds = allPages.flatMap(({ data }) => data.videos.map(video => video.id));

      return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined;
    }
  });

  useScrollEndPage({ hasNextPage, isFetchingNextPage, onEnd: fetchNextPage });

  const allVideos = data?.pages.flatMap(({ data }) => data.videos) || [];

  return (
    <VideoSection
      {...rest}
      className={cn('', {}, [className])}
      videos={allVideos}
      heading={{ text: 'Explore', icon: Compass }}
      isLoading={isLoading}
    />
  );
};

export default ExploreSection;

export const DynamicExploreSection = dynamic(() => Promise.resolve(ExploreSection), {
  ssr: false,
  loading: () => (
    <div className='grid grid-cols-6 gap-5 mt-12 '>
      {[...Array(6).keys()].map(i => (
        <SkeletonLoader
          key={i}
          className='h-44 rounded-lg'
        />
      ))}
    </div>
  )
});
