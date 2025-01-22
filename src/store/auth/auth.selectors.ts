import type { TRootState } from '..'

export const selectIsAuth = (state: TRootState) => state.auth.isAuth
