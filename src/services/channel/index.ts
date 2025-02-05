import { axiosCommon } from '@/api/axios'

import type { IChannel } from '@/types/chanel.types'

export class ChannelService {
	private path = '/channels'

	getAllChannels() {
		return axiosCommon.get<IChannel[]>(this.path)
	}

	getChannel(slug: string | null) {
		return axiosCommon.get<IChannel>(`${this.path}/by-slug/${slug}`)
	}
}

export const channelService = new ChannelService()
