import React from 'react'

import { cn } from '@/lib/utils'

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
	count?: number
}

const SkeletonLoader = (props: SkeletonLoaderProps) => {
	const { className = '', count = 1, ...rest } = props

	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					{...rest}
					className={cn('bg-slate-800 rounded-sm h-10 animate-pulse', {}, [className])}
				/>
			))}
		</>
	)
}

export default SkeletonLoader
