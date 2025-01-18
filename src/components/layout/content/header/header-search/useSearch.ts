import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

import { PUBLIC } from '@/configs/public.pages'

export const useSearch = () => {
	const router = useRouter()
	const [value, setValue] = useState('')

	const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		e.preventDefault()
		if (value.trim() !== '') {
			router.push(PUBLIC.SEARCH(value))
			setValue('')
		}
	}

	return {
		value,
		setValue,
		keyDownHandler
	}
}
