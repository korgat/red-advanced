import { axiosAuth, axiosCommon } from '@/api/axios'

import type { IChannel } from '@/types/chanel.types'

export class ChannelService {
	private path = '/channels'

	getAllChannels() {
		return axiosCommon.get<IChannel[]>(this.path)
	}

	getChannel(slug: string | null) {
		return axiosCommon.get<IChannel>(`${this.path}/by-slug/${slug}`)
	}

	toggleSubscribe(channelSlug: string) {
		return axiosAuth.patch(`${this.path}/toggle-subscribe/${channelSlug}`)
	}
}

export const channelService = new ChannelService()
