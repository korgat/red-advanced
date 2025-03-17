'use client'

import { Heart } from 'lucide-react'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

import { useProfile } from '@/hooks/useProfile'

import { cn } from '@/lib/utils'

interface LikedSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const LikedSection = (props: LikedSectionProps) => {
	const { className = '', ...rest } = props
	const { data, isPending } = useProfile()

	return (
		<VideoSection
			{...rest}
			className={cn('max-w-[800px] p-layout h-full', {}, [className])}
			heading={{ tag: 'h1', text: 'Liked', icon: Heart }}
			isLoading={isPending}
			videos={data?.data.likes.map(item => item.video)}
			isList
		/>
	)
}

export default LikedSection
