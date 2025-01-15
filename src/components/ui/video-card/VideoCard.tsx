import { Check, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { transformDate } from '@/lib/transform-date'
import { transformViews } from '@/lib/transform-views'
import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
	item: IVideo
	icon: LucideIcon
}

const VideoCard = (props: VideoCardProps) => {
	const { className = '', item, icon: Icon, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			<div>
				<Link href={item.slug}>
					<Image
						src={item.thumbnailUrl}
						width={250}
						height={140}
						alt={item.title}
					/>
				</Link>
				<Image
					src={item.channel.avatarUrl}
					alt={item.channel.name}
					width={30}
					height={30}
				/>
			</div>
			<div>
				<div>
					{Icon && <Icon className='text-primary' />}
					<span>{transformViews(item.viewsCount)}</span>
					<span>{transformDate(item.createdAt)}</span>
				</div>
				<p>{item.description}</p>
				<div>
					<span>{item.channel.name}</span>
					<span>{item.channel.isVerified && <Check className='text-green-500' />}</span>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
