import { useQuery } from '@tanstack/react-query'
import { type ChangeEvent, type DragEvent, useEffect, useState } from 'react'

import { fileService } from '@/services/file'

interface Props {
	uploadFile: (file: File) => void
	setIsVideoProcessed: React.Dispatch<React.SetStateAction<boolean>>
	fileName: string
	isVideoProcessed: boolean
}

export const useDragDrop = ({
	fileName,
	isVideoProcessed,
	setIsVideoProcessed,
	uploadFile
}: Props) => {
	const [isDragging, setIsDragging] = useState(false)

	const { data: progress } = useQuery({
		queryKey: ['video-progress'],
		queryFn: () => fileService.getProcessingStatus(fileName),
		refetchInterval: query => {
			const queryProgress = query.state.data?.data
			return queryProgress !== undefined && queryProgress.status < 100 ? 5000 : false
		},
		enabled: !!fileName && !isVideoProcessed
	})

	const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => setIsDragging(false)

	const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer?.files?.[0]
		if (file) uploadFile(file)
	}

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) uploadFile(file)
	}

	useEffect(() => {
		if (!progress) return
		if (progress.data.status === 100) {
			setIsVideoProcessed(true)

			const toastSuccess = async () => {
				const { toast } = await import('react-hot-toast')
				toast.success('Video processed successfully!')
			}

			toastSuccess()
		}
	}, [progress, setIsVideoProcessed])

	return {
		isDragging,
		progress: progress?.data.status,
		inputChangeHandler,
		handleDragOver,
		handleDragLeave,
		handleDrop
	}
}
