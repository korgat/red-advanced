import { axiosAuth } from '@/api/axios'

export class ChannelService {
	private path = '/channels'

	getChannel(slug: string | null) {
		return axiosAuth.get(`${this.path}/by-slug/${slug}`)
	}
}

export const channelService = new ChannelService()
