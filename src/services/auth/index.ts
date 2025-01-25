import Cookies from 'js-cookie'

import type { IAuthData } from '@/components/form/auth-form/authForm.types'

import { clearAuthData, setAuthData } from '@/store/auth/auth.slice'

import { axiosCommon } from '@/api/axios'

import { ETokens, type IAuthResponse, type TAuthType } from './auth.types'
import { store } from '@/store'

class AuthService {
	private _path = '/auth'

	private _setTokenCookie(accessToken: string) {
		Cookies.set(ETokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1
		})
	}

	private _removeTokenCookie() {
		Cookies.remove(ETokens.ACCESS_TOKEN)
	}

	async authenticate(type: TAuthType, data: IAuthData, recaptchaToken?: string | null) {
		const res = await axiosCommon.post<IAuthResponse>(`${this._path}/${type}`, data, {
			headers: {
				recaptcha: recaptchaToken
			}
		})

		if (res.data.accessToken) {
			this._setTokenCookie(res.data.accessToken)
			store.dispatch(setAuthData(res.data))
		}

		return res
	}

	async logout() {
		const res = await axiosCommon.post<boolean>(`${this._path}/logout`)

		if (res.data) {
			this._removeTokenCookie()
			store.dispatch(clearAuthData())
		}

		return res
	}

	// CLIENT
	async getNewTokens() {
		const res = await axiosCommon.post<IAuthResponse>(`${this._path}/access-token`)

		if (res.data.accessToken) {
			this._setTokenCookie(res.data.accessToken)
			store.dispatch(setAuthData(res.data))
		}

		return res
	}

	// SERVER
	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosCommon.post<IAuthResponse>(
			`${this._path}/access-token`,
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)

		return response.data
	}
}

export const authService = new AuthService()
