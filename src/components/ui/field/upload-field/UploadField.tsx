import { CloudDownload } from 'lucide-react'

import ImagePreview from './ImagePreview'
import { useUploadField } from './useUploadField'
import { cn } from '@/lib/utils'

interface UploadFieldProps {
	className?: string
	label: string
	errorMessage?: string
	folder: string
	onChange: (url: string) => void
	value: string
	isImage?: boolean
	aspectRatio?: '16:9' | '1:1'
	overlay?: string
}

const UploadField = (props: UploadFieldProps) => {
	const {
		className = '',
		label,
		value,
		folder,
		errorMessage,
		aspectRatio = '1:1',
		isImage = true,
		overlay,
		onChange
	} = props
	const { isLoading, uploadFile } = useUploadField(onChange, folder)

	return (
		<div className={cn('mb-4', {}, [className])}>
			<label>
				<span className='block text-gray-400 font-semibold mb-2'>{label}</span>
				<span className='py-2 px-10 flex items-center gap-4 text-gray-400 hover:text-white border border-white rounded transition cursor-pointer w-max'>
					<CloudDownload />
					Upload
				</span>
				<input
					type='file'
					accept='image/*'
					className='hidden'
					onChange={uploadFile}
				/>
			</label>
			{errorMessage && <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>}

			{isImage && (
				<ImagePreview
					isLoading={isLoading}
					aspectRatio={aspectRatio}
					overlay={overlay}
					value={value}
				/>
			)}
		</div>
	)
}

export default UploadField
