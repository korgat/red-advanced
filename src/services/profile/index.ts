import type { ISettingsForm } from '@/components/form/settings-form'

import { axiosAuth } from '@/api/axios'

import type { IFullUser } from '@/types/user.types'

class ProfileService {
	private path = '/users'

	getProfile() {
		return axiosAuth.get<IFullUser>(`${this.path}/profile`)
	}
	updateProfile(data: ISettingsForm) {
		return axiosAuth.put<IFullUser>(`${this.path}/profile`, data)
	}
}

export const profileService = new ProfileService()
