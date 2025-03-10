import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Heading from '@/ui/heading/Heading'

import { PUBLIC } from '@/configs/public.pages'
import { getInitials } from '@/lib/getInitials'
import { transformDate } from '@/lib/transform-date'
import { cn } from '@/lib/utils'
import type { IComment } from '@/types/comments.types'

interface CommentItemProps extends React.HTMLAttributes<HTMLLIElement> {
	comment: IComment
	slug: string
}

const CommentItem = (props: CommentItemProps) => {
	const { className = '', comment, slug, ...rest } = props

	return (
		<li
			{...rest}
			className={cn('', {}, [className])}
		>
			<div className='flex justify-between items-start'>
				<div className='flex gap-4'>
					<Link href={PUBLIC.CHANNEL(slug)}>
						{comment.user.channel?.avatarUrl ? (
							<Image
								alt={comment.user.name || 'avatar'}
								src={comment.user.channel?.avatarUrl || ''}
								width={40}
								height={40}
								className='rounded object-cover h-[50px] w-[50px]'
							/>
						) : (
							<div className='bg-gray-700 rounded w-10 h-10 flex items-center justify-center font-semibold tracking-wide text-base'>
								{getInitials(comment.user.name)}
							</div>
						)}
					</Link>
					<div>
						<Heading
							className='mb-2 text-lg leading-5 mb'
							tag='h2'
						>
							<div className='flex items-baseline gap-3'>
								{comment.user.name}
								<div className='text-xs text-gray-400'>{transformDate(comment.createdAt)}</div>
							</div>
						</Heading>
						<p className='text-sm text-gray-300 mb-3.5'>{comment.text}</p>
						<div className='flex items-center gap-4'>
							<button className='text-white/80 hover:text-white text-sm '>Edit</button>
							<button className='text-white/80 hover:text-primary text-sm '>Delete</button>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default CommentItem
