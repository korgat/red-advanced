import { createSlice } from '@reduxjs/toolkit'

import type { ILayoutState } from './layout.types'

const initialState: ILayoutState = {
	isSidebarOpen: true
}

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		toggleSidebar: state => {
			state.isSidebarOpen = !state.isSidebarOpen
		}
	}
})

export const { toggleSidebar } = layoutSlice.actions
