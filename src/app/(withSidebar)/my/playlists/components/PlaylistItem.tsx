import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Heading from '@/ui/heading/Heading'

import { PUBLIC } from '@/configs/public.pages'
import { cn } from '@/lib/utils'

interface PlaylistItemProps extends React.HTMLAttributes<HTMLDivElement> {
	playlistTitle: string
	lastVideoThumbnail: string
	videoAmount: number
	id: string
}

const PlaylistItem = (props: PlaylistItemProps) => {
	const { className = '', style, lastVideoThumbnail, playlistTitle, videoAmount, id } = props

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
				className='flex flex-col'
				href={PUBLIC.SELECT_PLAYLIST(id)}
			>
				<div className='relative rounded-md mb-1.5'>
					<div className='absolute h-full w-11/12 left-1/2 -top-1.5 -translate-x-1/2 bg-gray-600 -z-[1] border border-background  rounded-md'></div>
					<div className='absolute h-full w-10/12 left-1/2 -top-2.5 -translate-x-1/2 bg-gray-500 -z-[2] border border-background rounded-md'></div>
					<Image
						src={lastVideoThumbnail}
						width={280}
						height={160}
						alt={playlistTitle}
						quality={100}
						className='rounded-md border border-background '
					/>
				</div>
				<div className='flex justify-between w-full px-3'>
					<Heading
						className='text-base mb-auto text-gray-300'
						tag='h3'
					>
						{playlistTitle}
					</Heading>
					<div className='text-sm text-gray-500'>{videoAmount} videos</div>
				</div>
			</Link>
		</m.div>
	)
}

export default PlaylistItem
