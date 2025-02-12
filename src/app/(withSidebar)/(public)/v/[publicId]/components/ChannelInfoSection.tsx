import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { DynamicSubscriptionButton } from '@/components/subscription-button'

import Heading from '@/ui/heading/Heading'

import { PUBLIC } from '@/configs/public.pages'
import { formatCount } from '@/lib/format-count'
import { cn } from '@/lib/utils'

interface ChannelInfoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	slug: string
	channelName?: string
	channelAvatar: string
	subscribersCount: number
}

const ChannelInfoSection = (props: ChannelInfoSectionProps) => {
	const { className = '', slug, channelAvatar, channelName, subscribersCount, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('flex justify-between items-start mb-6', {}, [className])}
		>
			<div className='flex gap-5'>
				<Link href={PUBLIC.CHANNEL(slug)}>
					<Image
						alt={channelName || 'avatar'}
						src={channelAvatar}
						width={50}
						height={50}
						priority
						className='rounded object-cover h-[50px] w-[50px]'
					/>
				</Link>
				<div>
					<Link href={PUBLIC.CHANNEL(slug)}>
						<Heading
							className='mb-0.5 text-lg leading-5'
							tag='h2'
						>
							<div className='flex items-center gap-1.5'>
								{channelName}
								<Check
									size={15}
									className='text-green-500'
								/>
							</div>
						</Heading>
					</Link>
					<div className='text-sm text-gray-400'>{formatCount(subscribersCount)} subscribers</div>
				</div>
			</div>
			<DynamicSubscriptionButton slug={slug} />
		</div>
	)
}

export default ChannelInfoSection
