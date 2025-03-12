'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import Heading from '@/ui/heading/Heading'

import CommentActions from './CommentActions'
import { PUBLIC } from '@/configs/public.pages'
import { getInitials } from '@/lib/getInitials'
import { transformDate } from '@/lib/transform-date'
import { cn } from '@/lib/utils'
import type { IComment } from '@/types/comments.types'
import type { IUser } from '@/types/user.types'

interface CommentItemProps extends React.HTMLAttributes<HTMLLIElement> {
	comment: IComment
	slug: string
	publicId: string
	user: IUser | null
}

const CommentItem = (props: CommentItemProps) => {
	const { className = '', comment, slug, user, publicId, ...rest } = props
	const isUserComment = user?.id === comment.user.id
	const [text, setText] = useState(comment.text)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}, [text])

	return (
		<li
			{...rest}
			className={cn(
				'pb-5 mb-6 border-b border-border-muted last:border-none',
				{
					'pb-6': isUserComment
				},
				[className]
			)}
		>
			<div className='flex justify-between items-start'>
				<div className='flex gap-4 w-full'>
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
					<div className='w-full'>
						<Heading
							className='mb-2 text-lg leading-5 mb'
							tag='h2'
						>
							<div className='flex items-baseline gap-3'>
								{comment.user.name}
								<div className='text-xs text-gray-400'>{transformDate(comment.createdAt)}</div>
							</div>
						</Heading>
						<textarea
							ref={textareaRef}
							rows={1}
							className='bg-transparent outline-none border-transparent resize-none w-full  block'
							value={text}
							onChange={e => setText(e.target.value)}
						></textarea>
						{isUserComment && (
							<CommentActions
								commentText={text}
								comment={comment}
								publicId={publicId}
							/>
						)}
					</div>
				</div>
			</div>
		</li>
	)
}

export default CommentItem

export const DynamicComments = dynamic(() => Promise.resolve(CommentItem), {
	ssr: false
})
