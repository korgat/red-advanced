import React from 'react'

import Button from '@/ui/button/Button'
import { Textarea } from '@/ui/field'

import { useCommentsForm } from './useCommentForm'
import { cn } from '@/lib/utils'

interface CommentInputProps extends React.HTMLAttributes<HTMLFormElement> {
	videoId: string
	publicId: string
}

const CommentInput = (props: CommentInputProps) => {
	const { className = '', videoId, publicId, ...rest } = props
	console.log(videoId)
	const { errors, isLoading, onSubmit, register } = useCommentsForm(videoId, publicId)

	return (
		<form
			{...rest}
			className={cn('flex gap-16', {}, [className])}
			onSubmit={onSubmit}
		>
			<Textarea
				className='mb-0 w-full'
				registration={register('comment', { required: 'Cant be empty' })}
				errorMessage={errors.comment?.message}
				placeholder='Enter comment:'
				rows={1}
			/>
			<Button
				disabled={isLoading}
				variant='secondary'
				type='submit'
			>
				Comment
			</Button>
		</form>
	)
}

export default CommentInput
