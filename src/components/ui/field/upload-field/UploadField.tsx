import type { AxiosResponse } from 'axios'
import { CloudDownload } from 'lucide-react'
import type { ChangeEvent } from 'react'

import ImagePreview from './ImagePreview'
import { useUploadField } from './useUploadField'
import { cn } from '@/lib/utils'
import type { UploadResponseItem } from '@/types/file.types'

interface UploadFieldProps {
	className?: string
	label: string
	errorMessage?: string
	folder: string
	onSuccess?: (data: AxiosResponse<UploadResponseItem[]>) => void
	value: string
	isImage?: boolean
	previewSizes?: [number, number]
	overlay?: string
}

const UploadField = (props: UploadFieldProps) => {
	const {
		className = '',
		label,
		value,
		folder,
		errorMessage,
		previewSizes = [100, 100],
		isImage = true,
		overlay,
		onSuccess
	} = props
	const { isLoading, uploadFile } = useUploadField({ folder, onSuccess })

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files?.length) return

		uploadFile(files[0])
	}

	return (
		<div className={cn('mb-4', {}, [className])}>
			<label>
				<span className='block text-gray-400 font-semibold mb-2'>{label}</span>
				<span className='py-2 px-10 flex items-center gap-4 text-gray-400 hover:text-white border rounded transition cursor-pointer w-max hover:border-white'>
					<CloudDownload />
					Upload
				</span>
				<input
					type='file'
					accept='image/*'
					className='hidden'
					onChange={changeHandler}
				/>
			</label>
			{errorMessage && <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>}

			{isImage && (
				<ImagePreview
					isLoading={isLoading}
					previewSizes={previewSizes}
					overlay={overlay}
					value={value}
				/>
			)}
		</div>
	)
}

export default UploadField
