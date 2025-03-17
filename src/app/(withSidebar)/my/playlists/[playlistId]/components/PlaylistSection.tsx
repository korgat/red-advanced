'use client'

import { useQuery } from '@tanstack/react-query'
import { History } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

import { cn } from '@/lib/utils'
import { playlistService } from '@/services/playLists'

interface PlaylistSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlaylistSection = (props: PlaylistSectionProps) => {
	const { className = '', ...rest } = props
	const { playlistId } = useParams()

	const { data, isPending } = useQuery({
		queryKey: ['playlist', [playlistId]],
		queryFn: () => playlistService.getPlaylistById(playlistId as string)
	})

	return (
		<VideoSection
			{...rest}
			className={cn('max-w-[800px] p-layout h-full', {}, [className])}
			heading={{ tag: 'h1', text: 'History', icon: History }}
			isLoading={isPending}
			videos={data?.data.videos}
			isList
		/>
	)
}

export default PlaylistSection
