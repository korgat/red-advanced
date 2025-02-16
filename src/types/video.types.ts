import type { IChannel } from './chanel.types'
import type { IPagination } from './pagination.types'

export enum EnumVideoPlayerQuality {
	'4K' = '4K',
	'2K' = '2K',
	'1080p' = '1080p',
	'720p' = '720p',
	'480p' = '480p',
	'360p' = '360p'
}

export interface IVideo {
	id: string
	publicId: string
	title: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	viewsCount: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
	updatedAt: string
	maxResolution: EnumVideoPlayerQuality
}

export interface IVideosPagination extends IPagination {
	videos: IVideo[]
}

export interface IFullVideo extends IVideo {
	likes: []
}

export interface ISingleVideoResponse extends IFullVideo {
	similarVideos: IVideo[]
}
