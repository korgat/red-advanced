'use client'

import { AnimatePresence, m } from 'framer-motion'
import React from 'react'

import { useOutside } from '@/hooks/useOutside'

import { VIDEO_QUALITIES } from './qualitySelector.data'
import { cn } from '@/lib/utils'
import type { EnumVideoPlayerQuality } from '@/types/video.types'

interface QualitySelectorProps extends React.HTMLAttributes<HTMLDivElement> {
	currentQuality: EnumVideoPlayerQuality
	setQuality: (quality: EnumVideoPlayerQuality) => void
	maxResolution: EnumVideoPlayerQuality
}

const QualitySelector = (props: QualitySelectorProps) => {
	const { className = '', currentQuality, maxResolution, setQuality, ...rest } = props
	const { isShow, ref, setIsShow } = useOutside<HTMLUListElement>(false)
	console.log(VIDEO_QUALITIES.indexOf(maxResolution))
	const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution))
	return (
		<div
			{...rest}
			className={cn('relative inline-block', {}, [className])}
		>
			<button
				className='transition-colors hover:text-primary'
				onClick={() => setIsShow(prev => !prev)}
			>
				{currentQuality}
			</button>

			<AnimatePresence>
				{isShow && (
					<m.ul
						ref={ref}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{
							duration: 0.3,
							damping: 0
						}}
						className='bg-gray-800 py-2 px-4 rounded absolute bottom-full left-0 z-10 shadow'
					>
						{availableQualities.map(quality => (
							<li
								key={quality}
								className='mb-1'
							>
								<button
									disabled={currentQuality === quality}
									onClick={() => {
										setQuality(quality)
										setIsShow(false)
									}}
									className='flex items-center gap-2 disabled:text-red-400 transition-colors hover:text-primary'
								>
									{quality}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}

export default QualitySelector
