'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { useScrollEndPage } from '@/hooks/useScrollEndPage'

import StudioVideoSection from './StudioVideoSection'
import { cn } from '@/lib/utils'
import { studioVideoService } from '@/services/studio-video'

interface StudioSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const StudioSection = (props: StudioSectionProps) => {
	const { className = '', ...rest } = props
	const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
		queryKey: ['studioVideoList'],
		queryFn: ({ pageParam }) =>
			studioVideoService.getAll({
				page: pageParam.page,
				limit: 6
			}),
		initialPageParam: { page: 1 },
		getNextPageParam: lastPage => {
			const { page, totalPages } = lastPage.data

			return page < totalPages ? { page: page + 1 } : undefined
		}
	})

	useScrollEndPage({ hasNextPage, isFetchingNextPage, onEnd: fetchNextPage })

	const allVideos = data?.pages.flatMap(({ data }) => data.videos) || []

	return (
		<StudioVideoSection
			{...rest}
			className={cn('p-layout', {}, [className])}
			videos={allVideos}
			heading={{ text: 'Explore', icon: Compass }}
			isLoading={isLoading}
		/>
	)
}

export default StudioSection

export const DynamicExploreSection = dynamic(() => Promise.resolve(StudioSection), {
	ssr: false,
	loading: () => (
		<div className='grid gap-5 mt-12 '>
			{[...Array(6).keys()].map(i => (
				<SkeletonLoader
					key={i}
					className='h-44 rounded-lg'
				/>
			))}
		</div>
	)
})
