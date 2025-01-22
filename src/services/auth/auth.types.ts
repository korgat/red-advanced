import type { IUser } from '@/types/user.types'

export enum ETokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export type TAuthType = 'login' | 'register'

export interface IAuthResponse {
	user: IUser
	accessToken: string
}
