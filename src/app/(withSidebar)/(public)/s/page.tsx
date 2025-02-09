import type { Metadata } from 'next'

import { DynamicSearchSection } from './components/SearchSection'
import { NO_INDEX_PAGE } from '@/const/seo.const'

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}

export default function SearchPage() {
	return <DynamicSearchSection className='h-full' />
}
