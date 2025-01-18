'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import SearchResult from './SearchResult'
import { cn } from '@/lib/utils'
import { videoService } from '@/services/video.service'

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
		<section
			{...rest}
			className={cn('', {}, [className])}
		>
			<Heading
				className='mb-0'
				tag='h1'
			>
				Search &quot;{term}&quot;
			</Heading>

			{isLoading ? (
				<div className='grid grid-cols-6 gap-5 mt-4'>
					<SkeletonLoader
						className='h-44'
						count={6}
					/>
				</div>
			) : (
				<SearchResult videos={data?.data.videos} />
			)}
		</section>
	)
}

export default SearchSection
