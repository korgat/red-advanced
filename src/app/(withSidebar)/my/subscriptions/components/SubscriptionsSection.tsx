'use client'

import { Heart } from 'lucide-react'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

import { useProfile } from '@/hooks/useProfile'

import { cn } from '@/lib/utils'

interface SubscriptionsSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const SubscriptionsSection = (props: SubscriptionsSectionProps) => {
	const { className = '', ...rest } = props
	const { data, isPending } = useProfile()

	return (
		<VideoSection
			{...rest}
			className={cn('', {}, [className])}
			heading={{ tag: 'h1', text: 'Subscriptions', icon: Heart }}
			isLoading={isPending}
			videos={data?.data.subscribedVideos}
		/>
	)
}

export default SubscriptionsSection
