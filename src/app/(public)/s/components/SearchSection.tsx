'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

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
