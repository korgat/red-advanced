import type { CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getErrorMessage } from './api.helper';
import { API_URL } from '@/const/constants';
import { authService } from '@/services/auth';
import { ETokens } from '@/services/auth/auth.types';

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

export const axiosCommon = axios.create(options);
export const axiosAuth = axios.create(options);

axiosAuth.interceptors.request.use(config => {
  const accessToken = Cookies.get(ETokens.ACCESS_TOKEN);

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        getErrorMessage(error) === 'jwt expired' ||
        getErrorMessage(error) === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authService.getNewTokens();
        return axiosAuth.request(originalRequest);
      } catch (error) {
        if (
          getErrorMessage(error) === 'jwt expired' ||
          getErrorMessage(error) === 'Refresh token not passed'
        ) {
          authService.removeFromStorage();
          return null;
        }
      }
    }

    throw error;
  }
);
