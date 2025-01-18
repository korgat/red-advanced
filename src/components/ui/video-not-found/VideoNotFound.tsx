import { SquareX } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

interface VideoNotFoundProps extends React.HTMLAttributes<HTMLDivElement> {}

const VideoNotFound = (props: VideoNotFoundProps) => {
	const { className = '', ...rest } = props

	return (
		<div
			{...rest}
			className={cn('flex items-center justify-center gap-6', {}, [className])}
		>
			<SquareX
				className='text-primary'
				size={55}
			/>
			<h4 className='text-4xl text-gray-400'>Video not found</h4>
		</div>
	)
}

export default VideoNotFound
