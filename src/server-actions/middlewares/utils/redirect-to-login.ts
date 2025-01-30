import type { NextRequest } from 'next/server'

import { nextRedirect } from './next-redirect'
import { PUBLIC } from '@/configs/public.pages'

export const redirectToLogin = (request: NextRequest) => {
	return nextRedirect(PUBLIC.AUTH, request.url)
}
