import * as m from 'framer-motion/m'
import { Check, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Heading from '../heading/Heading'

import { PUBLIC } from '@/configs/public.pages'
import { formatCount } from '@/lib/format-count'
import { transformDate } from '@/lib/transform-date'
import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface VideoItemProps extends React.HTMLAttributes<HTMLDivElement> {
	item: IVideo
	icon?: LucideIcon
}

const VideoItem = (props: VideoItemProps) => {
	const { className = '', item, icon: Icon, style } = props

	return (
		<m.div
			whileHover={{
				scale: 1.01,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 40
			}}
			style={style}
			className={cn('', {}, [className])}
		>
			<Link
				className='flex gap-8'
				href={PUBLIC.VIDEO(item.publicId)}
			>
				<div className='relative rounded-md overflow-hidden mb-1.5 min-w-[200px]'>
					<Image
						src={item.thumbnailUrl}
						width={200}
						height={112}
						alt={item.title}
						quality={100}
					/>
				</div>
				<div className='w-full'>
					<div className='flex items-top text-gray-500 mb-1.5'>
						{Icon && (
							<Icon
								className='text-primary mr-1'
								size={16}
							/>
						)}
						<span className='mr-auto text-sm'>{formatCount(item.viewsCount)} views</span>
						<span className='text-xs'>{transformDate(item.createdAt)}</span>
					</div>
					<Heading
						className='text-base mb-auto'
						tag='h3'
					>
						{item.title}
					</Heading>
					<div className='flex items-center gap-3'>
						<span className='text-gray-500 text-xs'>{item.channel.user.name}</span>
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
			</Link>
		</m.div>
	)
}

export default VideoItem
