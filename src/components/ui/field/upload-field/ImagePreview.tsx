import Image from 'next/image'
import React from 'react'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { cn } from '@/lib/utils'

interface ImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	isLoading: boolean
	value?: string
	overlay?: string
	aspectRatio?: '16:9' | '1:1'
}

const ImagePreview = (props: ImagePreviewProps) => {
	const { className = '', value, isLoading, overlay, aspectRatio, ...rest } = props
	const isWidescreenRation = aspectRatio === '16:9'
	const width = isWidescreenRation ? 446 : 100
	const height = isWidescreenRation ? 250 : 100

	return (
		<div
			className={cn('mt-3', {}, [className])}
			{...rest}
		>
			{isLoading ? (
				<SkeletonLoader
					style={{
						width,
						height
					}}
				/>
			) : (
				!!value && (
					<div className='relative w-max'>
						{!!overlay && (
							<Image
								alt='Overlay'
								className='rounded-md absolute top-0 left-0 w-full h-full'
								src={overlay}
								width={width}
								height={height}
								priority
							/>
						)}
						<Image
							alt='Uploaded file'
							className='rounded-md'
							src={value}
							width={width}
							height={height}
							priority
						/>
					</div>
				)
			)}
		</div>
	)
}

export default ImagePreview
