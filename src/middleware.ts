import { type NextRequest } from 'next/server'

import { PUBLIC } from './configs/public.pages'
import { STUDIO } from './configs/studio.pages'
import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware'
import { protectStudio } from './server-actions/middlewares/protect-studio.middleware'

export async function middleware(request: NextRequest) {
	const url = new URL(request.url)
	const pathname = url.pathname

	if (pathname.includes(STUDIO.HOME) || pathname.includes(PUBLIC.SUBSCRIPTIONS)) {
		return protectStudio(request)
	}

	if (pathname.includes(PUBLIC.AUTH)) {
		return protectLoginPages(request)
	}
}

export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/settings/:path*', '/my/:path*']
}
