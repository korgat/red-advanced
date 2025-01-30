import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/const/seo.const'

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return <div>Settings</div>
}
