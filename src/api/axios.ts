import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

import { API_URL } from '@/const/constans'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const axiosCommon = axios.create(options)
