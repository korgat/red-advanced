'use client'

import { AnimatePresence, m } from 'framer-motion'
import React from 'react'

import { useOutside } from '@/hooks/useOutside'

import { EnumVideoPlayerQuality } from '../videoPlayer.types'

import { VIDEO_QUALITIES } from './qualitySelector.data'
import { cn } from '@/lib/utils'

interface QualitySelectorProps extends React.HTMLAttributes<HTMLDivElement> {
	currentQuality: EnumVideoPlayerQuality
	setQuality: (quality: EnumVideoPlayerQuality) => void
}

const QualitySelector = (props: QualitySelectorProps) => {
	const { className = '', currentQuality, setQuality, ...rest } = props
	const { isShow, ref, setIsShow } = useOutside<HTMLUListElement>(false)
	console.log('render quality')
	return (
		<div
			{...rest}
			className={cn('relative inline-block', {}, [className])}
		>
			<button onClick={() => setIsShow(prev => !prev)}>{currentQuality}</button>

			<AnimatePresence>
				{isShow && (
					<m.ul
						ref={ref}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-white/10 py-2 px-4 rounded absolute bottom-full right-0 z-10 shadow'
					>
						{VIDEO_QUALITIES.map(quality => (
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
