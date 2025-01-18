import { Check, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PUBLIC } from '@/configs/public.pages'
import { transformDate } from '@/lib/transform-date'
import { transformViews } from '@/lib/transform-views'
import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
	item: IVideo
	icon?: LucideIcon
}

const VideoCard = (props: VideoCardProps) => {
	const { className = '', item, icon: Icon, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			<div className='relative rounded-md overflow-hidden mb-1.5'>
				<Link href={PUBLIC.VIDEO(item.publicId)}>
					<Image
						src={item.thumbnailUrl}
						width={350}
						height={196}
						alt={item.title}
					/>
				</Link>
				<Image
					className='absolute bottom-1 left-1 rounded-full'
					src={item.channel.avatarUrl}
					alt={item.channel.id}
					width={30}
					height={30}
				/>
			</div>
			<div>
				<div className='flex items-top text-gray-500 mb-1.5'>
					{Icon && (
						<Icon
							className='text-primary mr-1'
							size={16}
						/>
					)}
					<span className='mr-auto text-sm'>{transformViews(item.viewsCount)}</span>
					<span className='text-xs'>{transformDate(item.createdAt)}</span>
				</div>
				<p className='line-clamp-2 mb-2'>{item.description}</p>
				<div className='flex items-end gap-3'>
					<span className='text-gray-500 text-xs'>XXXXX</span>
					<span>
						{item.channel.isVerified && (
							<Check
								className='text-green-500'
								size={18}
							/>
						)}
					</span>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
