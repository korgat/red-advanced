'use client'

import React from 'react'

import Heading from '@/ui/heading/Heading'

import UploadForm from './uploadForm/UploadForm'
import { cn } from '@/lib/utils'

interface UploadSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const UploadSection = (props: UploadSectionProps) => {
	const { className = '', ...rest } = props

	return (
		<div
			{...rest}
			className={cn('h-full flex justify-center bg-black/30 z-50', {}, [className])}
		>
			<div className='h-max bg-gray-800 rounded-lg p-6 mt-20 min-w-[550px]'>
				<Heading className='text-xl'>Upload video</Heading>
				<UploadForm />
			</div>
		</div>
	)
}

export default UploadSection
