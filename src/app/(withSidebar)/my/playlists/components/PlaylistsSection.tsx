'use client'

import { ListVideo } from 'lucide-react'
import React from 'react'

import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { useUserPlaylists } from '@/hooks/usePlaylist'

import Playlist from './Playlist'
import { cn } from '@/lib/utils'

interface PlaylistsSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlaylistsSection = (props: PlaylistsSectionProps) => {
	const { className = '', ...rest } = props
	const { playlists, isPlaylistPending } = useUserPlaylists()

	return (
		<section
			{...rest}
			className={cn('', {}, [className])}
		>
			<Heading
				className='mb-0'
				tag='h1'
				icon={ListVideo}
			>
				Playlist
			</Heading>

			{isPlaylistPending && (
				<div className={cn('grid grid-cols-6 gap-5 mt-4')}>
					<SkeletonLoader
						className={cn('h-44 rounded-lg')}
						count={6}
					/>
				</div>
			)}
			{!isPlaylistPending && <Playlist playlists={playlists?.data || []} />}
		</section>
	)
}

export default PlaylistsSection
