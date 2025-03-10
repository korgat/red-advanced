'use client'

import parse from 'html-react-parser'
import React, { useEffect, useRef, useState } from 'react'

import Button from '../button/Button'

import { cn } from '@/lib/utils'

import styles from './toggleArticle.module.scss'

interface ToggleArticleProps extends React.HTMLAttributes<HTMLDivElement> {
	content: string
	maxHeight?: number
}

const ToggleArticle = (props: ToggleArticleProps) => {
	const { className = '', content, maxHeight = 70, ...rest } = props
	const contentRef = useRef<HTMLElement>(null)
	const [height, setHeight] = useState(0)
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight)
		}
	}, [content])

	return (
		<div
			{...rest}
			className={cn('relative', {}, [className])}
		>
			<article
				className={cn(
					'text-[0.91rem] text-ellipsis overflow-hidden leading-snug bg-gray-800 py-1 px-3 rounded',
					{},
					[styles.article]
				)}
				style={{
					height: expanded ? height : maxHeight,
					visibility: height ? 'visible' : 'hidden',
					overflow: 'hidden',
					WebkitMaskImage:
						expanded || height <= maxHeight + 30
							? 'none'
							: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0))',
					maskImage:
						expanded || height <= maxHeight + 30
							? 'none'
							: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0))'
				}}
				ref={contentRef}
			>
				{parse(content)}
			</article>
			{height >= maxHeight + 30 && (
				<Button
					className='px-1 py-0 mt-2 text-white/80 hover:text-white'
					onClick={() => setExpanded(prev => !prev)}
				>
					{expanded ? 'Hide' : 'Show'}
				</Button>
			)}
		</div>
	)
}

export default ToggleArticle
