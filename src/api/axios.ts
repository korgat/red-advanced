import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '@/const/constants'
import { ETokens } from '@/services/auth/auth.types'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const axiosCommon = axios.create(options)
export const axiosAuth = axios.create(options)

axiosAuth.interceptors.request.use(config => {
	const accessToken = Cookies.get(ETokens.ACCESS_TOKEN)

	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})
