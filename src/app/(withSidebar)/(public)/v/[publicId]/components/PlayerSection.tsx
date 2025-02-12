import React from 'react'

import VideoPlayer from '@/components/video-player/VideoPlayer'

import { cn } from '@/lib/utils'

interface PlayerSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	fileName: string
}

const PlayerSection = (props: PlayerSectionProps) => {
	const { className = '', fileName, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			<VideoPlayer fileName={fileName} />
		</div>
	)
}

export default PlayerSection
