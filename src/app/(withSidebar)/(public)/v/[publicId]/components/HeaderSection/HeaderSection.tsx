'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import React, { startTransition, useOptimistic, useState } from 'react'

import Heading from '@/ui/heading/Heading'

import { useProfile } from '@/hooks/useProfile'

import TogglePlaylist from './TogglePlaylist'
import { cn } from '@/lib/utils'
import { profileService } from '@/services/profile'

interface HeaderSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string
	viewsCount: string
	likesCount: number
	videoId: string
	videoPublicId: string
}

const HeaderSection = (props: HeaderSectionProps) => {
	const { className = '', title, viewsCount, likesCount, videoId, videoPublicId, ...rest } = props
	const { data, refetch } = useProfile()
	const [likes, setLikes] = useState(likesCount)
	const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes)
	const isLiked = data?.data.likes.some(like => like.videoId === videoId)

	const { mutate } = useMutation({
		mutationKey: ['like'],
		mutationFn: () => profileService.toggleLike(videoId),
		onSuccess: () => {
			setLikes(prev => (isLiked ? prev - 1 : prev + 1))
			refetch()
		},
		onMutate: () => {
			startTransition(() => {
				setOptimisticLikes(prev => prev + 1)
			})
		}
	})
	const likeClickHandler = () => {
		mutate()
	}

	return (
		<div
			{...rest}
			className={cn('flex justify-between pb-5 mb-5 border-b border-border', {}, [className])}
		>
			<div>
				<Heading
					className='mb-1 text-2xl'
					tag='h1'
				>
					{title}
				</Heading>
				<div className='text-sm text-gray-400'>{viewsCount} views</div>
			</div>
			<div className='flex gap-7 self-start'>
				<TogglePlaylist
					videoPublicId={videoPublicId}
					videoId={videoId}
				/>
				<button
					className='flex gap-2 text-primary items-center opacity-80 hover:opacity-100 transition-opacity'
					onClick={likeClickHandler}
				>
					<Heart
						size={20}
						fill={isLiked ? '#fd2828' : 'transparent'}
					/>
					<span className='leading-5'>{optimisticLikes}</span>
				</button>
			</div>
		</div>
	)
}

export default HeaderSection
