import type { EnumVideoPlayerQuality } from '@/types/video.types'

export type TVideoForm = {
	title: string
	description: string
	videoFileName: string
	maxResolution: EnumVideoPlayerQuality
	thumbnailUrl: string
	tags: string[]
}
