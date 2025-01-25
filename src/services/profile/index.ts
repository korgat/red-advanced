import { axiosAuth } from '@/api/axios'

import type { IFullUser } from '@/types/user.types'

class ProfileService {
	private path = '/users'

	getProfile() {
		return axiosAuth.get<IFullUser>(`${this.path}/profile`)
	}
}

export const profileService = new ProfileService()
