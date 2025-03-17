import { Upload } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

import styles from './dragDrop.module.scss'

interface DragDropTextProps extends React.HTMLAttributes<HTMLDivElement> {
	isDragging: boolean
	isLoading: boolean
}

const DragDropText = (props: DragDropTextProps) => {
	const { className = '', isDragging, isLoading, ...rest } = props

	return (
		<div
			{...rest}
			className={cn(
				'flex flex-col items-center',
				{
					[styles.loader]: isLoading
				},
				[className]
			)}
		>
			{!isLoading && (
				<>
					<Upload
						size={50}
						className='text-gray-400 mb-4'
					/>
					<p className='text-center text-gray-400 '>
						{isDragging ? 'Drop here' : 'Drag and drop your video file here, or click to select'}
					</p>
				</>
			)}
		</div>
	)
}

export default DragDropText
