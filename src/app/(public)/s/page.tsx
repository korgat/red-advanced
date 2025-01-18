import type { Metadata } from 'next'

import SearchSection from './components/components/searchSection/SearchSection'
import { NO_INDEX_PAGE } from '@/const/seo.const'

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}

export default function SearchPage() {
	return <SearchSection className='h-full' />
}
