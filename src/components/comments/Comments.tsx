'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import CommentItem from './CommentItem'
import { cn } from '@/lib/utils'
import { commentService } from '@/services/comments'
import type { IComment } from '@/types/comments.types'

interface CommentsProps extends React.HTMLAttributes<HTMLUListElement> {
	videoId: string
	comments: IComment[]
	slug: string
}

const Comments = (props: CommentsProps) => {
	const { className = '', videoId, comments, slug, ...rest } = props
	const { data } = useQuery({
		queryKey: ['comments', videoId],
		queryFn: () => commentService.getCommentsPublicId(videoId),
		initialData: comments
	})

	return (
		<ul
			{...rest}
			className={cn('', {}, [className])}
		>
			{data.map(comment => (
				<CommentItem
					className='pb-6 mb-6 border-b border-border-muted last:border-none'
					key={comment.id}
					comment={comment}
					slug={slug}
				/>
			))}
		</ul>
	)
}

export default Comments
