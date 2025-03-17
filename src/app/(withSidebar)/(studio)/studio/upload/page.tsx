import type { Metadata } from 'next'

import UploadSection from './components/UploadSection'
import { NO_INDEX_PAGE } from '@/const/seo.const'

export const metadata: Metadata = {
	title: 'Upload',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return <UploadSection />
}
