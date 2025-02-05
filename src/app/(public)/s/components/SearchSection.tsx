'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { cn } from '@/lib/utils'
import { videoService } from '@/services/video'

interface SearchSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchSection = (props: SearchSectionProps) => {
	const { className = '', ...rest } = props
	const searchParams = useSearchParams()
	const term = searchParams.get('term')
	const { data, isLoading } = useQuery({
		queryKey: ['explore', term],
		queryFn: () => videoService.getAll(term)
	})

	return (
		<VideoSection
			{...rest}
			className={cn('', {}, [className])}
			heading={{ tag: 'h1', text: `Search '${term}'` }}
			isLoading={isLoading}
			videos={data?.data.videos}
		/>
	)
}

export default SearchSection

export const DynamicSearchSection = dynamic(() => Promise.resolve(SearchSection), {
	ssr: false,
	loading: () => (
		<div className='grid grid-cols-6 gap-5 mt-4'>
			<SkeletonLoader
				count={3}
				className='h-44 rounded-md'
			/>
		</div>
	)
})
