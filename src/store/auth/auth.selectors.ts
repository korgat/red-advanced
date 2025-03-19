import type { TRootState } from '..';

export const selectIsAuth = (state: TRootState) => state.auth.isAuth;
export const selectUser = (state: TRootState) => state.auth.user;
