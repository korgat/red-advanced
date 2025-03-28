import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { authSlice } from './auth/auth.slice';
import { layoutSlice } from './layout/layout.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    layout: layoutSlice.reducer
  }
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<TAppDispatch>;
// export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector()
