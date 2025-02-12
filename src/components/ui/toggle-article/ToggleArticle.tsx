'use client'

import parse from 'html-react-parser'
import React, { useEffect, useRef, useState } from 'react'

import Button from '../button/Button'
import SkeletonLoader from '../skeleton-loader/SkeletonLoader'

import { cn } from '@/lib/utils'

import styles from './toggleArticle.module.scss'

interface ToggleArticleProps extends React.HTMLAttributes<HTMLElement> {
	content: string
	maxHeight?: number
}

const ToggleArticle = (props: ToggleArticleProps) => {
	const { className = '', content, maxHeight = 120, ...rest } = props
	const contentRef = useRef<HTMLElement>(null)
	const [height, setHeight] = useState(0)
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight)
		}
	}, [content])

	return (
		<div className='relative'>
			<div className='absolute'>
				<SkeletonLoader
					className={cn(`absolute w-full rounded h-[${maxHeight}px]`, {
						hidden: height
					})}
				/>
				<article
					{...rest}
					className={cn('', {}, [className, styles.article])}
					style={{
						maxHeight: expanded ? `${height}px` : `${maxHeight}px`,
						visibility: height ? 'visible' : 'hidden',
						overflow: 'hidden',
						transition: 'max-height 0.3s ease-in-out',
						WebkitMaskImage:
							expanded || height <= 120
								? 'none'
								: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0))',
						maskImage:
							expanded || height <= 120
								? 'none'
								: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0))'
					}}
					ref={contentRef}
				>
					{parse(content)}
				</article>
				{height >= 120 && (
					<Button
						className='px-1 py-0 mt-2 text-white/80 hover:text-white'
						onClick={() => setExpanded(prev => !prev)}
					>
						{expanded ? 'Hide' : 'Show'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default ToggleArticle
