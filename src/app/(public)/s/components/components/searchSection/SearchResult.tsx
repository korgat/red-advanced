import React from 'react'

import VideoCard from '@/ui/video-card/VideoCard'
import VideoNotFound from '@/ui/video-not-found/VideoNotFound'

import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface SearchResultProps extends React.HTMLAttributes<HTMLDivElement> {
	videos?: IVideo[]
}

const SearchResult = (props: SearchResultProps) => {
	const { className = '', videos, ...rest } = props

	return videos?.length ? (
		<div
			{...rest}
			className={cn('grid grid-cols-6 gap-5 mt-4', {}, [className])}
		>
			{videos.map(video => (
				<VideoCard
					key={video.id}
					item={video}
				/>
			))}
		</div>
	) : (
		<VideoNotFound className='h-full' />
	)
}

export default SearchResult
