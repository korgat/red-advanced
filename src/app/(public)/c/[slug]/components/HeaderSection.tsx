import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import Button from '@/ui/button/Button'
import Heading from '@/ui/heading/Heading'

import { formatCount } from '@/lib/format-count'
import { cn } from '@/lib/utils'
import type { IChannel } from '@/types/chanel.types'

interface HeaderSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	channel: IChannel
}

const HeaderSection = (props: HeaderSectionProps) => {
	const { className = '', channel, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('mb-10', {}, [className])}
		>
			<Image
				alt={channel.slug}
				src={channel.bannerUrl}
				width={1284}
				height={207}
				className='rounded-3xl h-[207px] object-cover mb-8'
			/>
			<div className='flex gap-7 w-1/2'>
				<Image
					alt={channel.slug}
					src={channel.avatarUrl}
					width={150}
					height={150}
					className='rounded-xl object-cover h-[150px] w-[150px]'
				/>
				<div>
					<Heading
						className='mb-0.5 text-3xl'
						tag='h1'
					>
						<div className='flex items-center gap-3'>
							{channel.user.name}
							<Check className='text-green-500' />
						</div>
					</Heading>
					<div className='flex items-center gap-3 text-sm font-semibold text-gray-500 mb-1'>
						<div>/{channel.slug}</div>
						<div>{formatCount(channel.subscribers.length)} subscribers</div>
						<div>{channel.videos.length} videos</div>
					</div>
					<article className='text-gray-300 text-sm mb-3'>{channel.description}</article>
					<Button variant='primary'>Subscribe</Button>
				</div>
			</div>
		</div>
	)
}

export default HeaderSection
