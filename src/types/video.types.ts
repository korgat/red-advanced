import type { IChannel } from './chanel.types'
import type { IPagination } from './pagination.types'

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
}

export interface IVideosPagination extends IPagination {
	videos: IVideo[]
}
