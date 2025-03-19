import { AxiosError } from 'axios';
import type { NextRequest } from 'next/server';

import { authService } from '@/services/auth';
import { ETokens } from '@/services/auth/auth.types';

export async function getTokensFromRequest(request: NextRequest) {
  const refreshToken = request.cookies.get(ETokens.REFRESH_TOKEN)?.value;
  let accessToken = request.cookies.get(ETokens.ACCESS_TOKEN)?.value;

  if (!refreshToken) {
    request.cookies.delete(ETokens.ACCESS_TOKEN);
    return null;
  }

  if (!accessToken) {
    try {
      const data = await authService.getNewTokensByRefresh(refreshToken);
      accessToken = data.accessToken;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.message === 'invalid token') {
          console.log('не валидный токен');
          request.cookies.delete(ETokens.ACCESS_TOKEN);
          return null;
        }
      }
      return null;
    }
  }

  return { accessToken, refreshToken };
}
