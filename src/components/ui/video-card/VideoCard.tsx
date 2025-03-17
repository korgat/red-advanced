import * as m from 'framer-motion/m'
import parse from 'html-react-parser'
import { Check, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC } from '@/configs/public.pages'
import { formatCount } from '@/lib/format-count'
import { transformDate } from '@/lib/transform-date'
import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
	item: IVideo
	icon?: LucideIcon
}

const VideoCard = (props: VideoCardProps) => {
	const { className = '', item, icon: Icon, style } = props
	return (
		<m.div
			whileHover={{
				scale: 1.05,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 40
			}}
			style={style}
			className={cn('flex flex-col', {}, [className])}
		>
			<div className='relative rounded-md overflow-hidden mb-1.5'>
				<Link href={PUBLIC.VIDEO(item.publicId)}>
					<Image
						className='aspect-video'
						src={item.thumbnailUrl}
						width={400}
						height={225}
						alt={item.title}
						quality={100}
					/>
				</Link>
				<Link href={PUBLIC.CHANNEL(item.channel.slug)}>
					<Image
						className='absolute bottom-1 left-1 rounded-full'
						src={item.channel.avatarUrl}
						alt={item.channel.id}
						width={30}
						height={30}
						quality={100}
					/>
				</Link>
			</div>
			<div className='flex-grow flex flex-col'>
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
				<article className='line-clamp-2 mb-2 flex-grow'>{parse(item.description)}</article>
				<div className='flex items-center gap-3'>
					<Link href={PUBLIC.CHANNEL(item.channel.slug)}>
						<span className='text-gray-500 text-xs'>{item.channel.user.name}</span>
					</Link>
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
		</m.div>
	)
}

export default VideoCard
