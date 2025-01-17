import type { IVideo } from './video.types'

export interface IChannel {
	id: string
	slug: string
	description: string
	isVerified: boolean
	avatarUrl: string
	bannerUrl: string

	videos: IVideo[]
	createdAt: string
}
