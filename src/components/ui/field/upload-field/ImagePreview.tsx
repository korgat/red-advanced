import Image from 'next/image'
import React from 'react'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { cn } from '@/lib/utils'

interface ImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	isLoading: boolean
	value?: string
	overlay?: string
	previewSizes: [number, number]
}

const ImagePreview = (props: ImagePreviewProps) => {
	const { className = '', value, isLoading, overlay, previewSizes, ...rest } = props
	const [width, height] = previewSizes

	return (
		<div
			{...rest}
			className={cn('mt-3', {}, [className])}
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
								style={{
									width,
									height
								}}
								alt='Overlay'
								className='rounded-md absolute top-0 left-0 w-full'
								src={overlay}
								width={width}
								height={height}
								priority
							/>
						)}
						<Image
							style={{
								width,
								height
							}}
							alt='Uploaded file'
							className='rounded-md object-cover'
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
