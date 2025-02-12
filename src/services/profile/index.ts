import type { ISettingsForm } from '@/components/form/settings-form'

import { axiosAuth } from '@/api/axios'

import type { IFullUser, IProfileResponse } from '@/types/user.types'

class ProfileService {
	private path = '/users'

	getProfile() {
		return axiosAuth.get<IProfileResponse>(`${this.path}/profile`)
	}
	updateProfile(data: ISettingsForm) {
		return axiosAuth.put<IFullUser>(`${this.path}/profile`, data)
	}
	toggleLike(videoId: string) {
		return axiosAuth.put(`${this.path}/profile/likes`, { videoId })
	}
}

export const profileService = new ProfileService()
