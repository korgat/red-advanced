import dayjs from 'dayjs'
import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import Heading from '@/ui/heading/Heading'

import ItemActions from './ItemActions'
import { cn } from '@/lib/utils'
import type { IFullVideo } from '@/types/video.types'

interface StudioVideoItemProps extends React.HTMLAttributes<HTMLDivElement> {
	item: IFullVideo
	icon?: LucideIcon
}

const StudioVideoItem = (props: StudioVideoItemProps) => {
	const { className = '', style, item } = props

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
			className={cn('grid grid-cols-[auto_2fr_1fr_1fr_1fr_1fr_1fr] gap-6', {}, [className])}
		>
			<Image
				className='rounded-md overflow-hidden mb-1.5 min-w-[200px] aspect-video object-cover'
				src={item.thumbnailUrl}
				width={200}
				height={112}
				alt={item.title}
				quality={100}
			/>
			<Heading
				className='text-base mb-auto'
				tag='h3'
			>
				{item.title}
			</Heading>
			<div className='flex flex-col gap-2 text-gray-500 mb-1.5'>
				<span className='text-base text-gray-300'>Published:</span>
				<span className='text-sm'>{dayjs(item.createdAt).format('DD MMM YYYY')}</span>
			</div>
			<div className='flex gap-2 text-gray-500 mb-1.5'>
				<span className='text-sm leading-6'>Views:</span>
				<span className='text-base leading-6 text-gray-300'>
					{item.viewsCount.toLocaleString('ru-RU')}
				</span>
			</div>
			<div className='flex gap-2 text-gray-500 mb-1.5'>
				<span className='text-sm leading-6'>Comments:</span>
				<span className='text-base leading-6 text-gray-300'>
					{item.comments.length.toLocaleString('ru-RU')}
				</span>
			</div>
			<div className='flex gap-2 text-gray-500 mb-1.5'>
				<span className='text-sm leading-6'>Likes:</span>
				<span className='text-base leading-6 text-gray-300'>
					{item.likes.length.toLocaleString('ru-RU')}
				</span>
			</div>
			<ItemActions
				className='flex gap-5 items-start
        '
				id={item.id}
				publicId={item.publicId}
			/>
		</m.div>
	)
}

export default StudioVideoItem
