import type { PayloadAction } from '@reduxjs/toolkit'

import type { IUser } from '@/types/user.types'

export interface IAuthState {
	user: IUser | null
	isAuth: boolean
	accessToken: string | null
}

export type TSetAuthDate = PayloadAction<{
	user: IUser
	accessToken: string
}>
