import type { TRootState } from '..'

export const selectSidebarStatus = (state: TRootState) => state.layout.isSidebarOpen
