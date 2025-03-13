import type { IChannel } from './chanel.types'
import type { IWatchHistory } from './history.types'
import type { IVideo } from './video.types'

export interface IUser {
	id: string
	name?: string
	email: string
}

export interface IFullUser extends IUser {
	channel?: IChannel
	subscriptions: IChannel[]
	watchHistory: IWatchHistory[]
	verificationToken?: string | null
}

export interface IVideoLike {
	id: string
	videoId: string
	userId: string
	video: IVideo
}

export interface IProfileResponse extends IFullUser {
	likes: IVideoLike[]
	subscribedVideos?: IVideo[]
}
