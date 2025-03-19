import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import type { IAuthState, TSetAuthDate } from './auth.types';
import { ETokens } from '@/services/auth/auth.types';

const initialState: IAuthState = {
  user: null,
  isAuth: !!Cookies.get(ETokens.ACCESS_TOKEN),
  accessToken: Cookies.get(ETokens.ACCESS_TOKEN) || null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: TSetAuthDate) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
    },
    clearAuthData: state => {
      state.user = null;
      state.isAuth = false;
      state.accessToken = null;
    }
  }
});

export const { clearAuthData, setAuthData } = authSlice.actions;
