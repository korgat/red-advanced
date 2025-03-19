'use client';

import { useQuery } from '@tanstack/react-query';
import { History } from 'lucide-react';
import React from 'react';

import VideoSection from '@/components/video-section/VideoSection';

import { cn } from '@/lib/utils';
import { watchHistoryService } from '@/services/watch-history';

interface HistorySectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const HistorySection = (props: HistorySectionProps) => {
  const { className = '', ...rest } = props;
  const { data, isPending } = useQuery({
    queryKey: ['watch-history'],
    queryFn: () => {
      return watchHistoryService.getUserHistory();
    }
  });

  return (
    <VideoSection
      {...rest}
      className={cn('max-w-[800px] p-layout h-full', {}, [className])}
      heading={{ tag: 'h1', text: 'History', icon: History }}
      isLoading={isPending}
      videos={data?.data.map(item => item.video)}
      isList
    />
  );
};

export default HistorySection;
