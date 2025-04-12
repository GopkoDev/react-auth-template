import userStore from '../store/user-store';
import { handleApiError } from './apiError';

export const privateFetcher = async (
  url: string,
  method: string = 'GET',
  options: RequestInit = {}
) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(url, {
    method,
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!refreshResponse.ok) {
      userStore.clearUser();
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return handleApiError(refreshResponse);
    }

    const { accessToken: newAccessToken } = await refreshResponse.json();
    localStorage.setItem('accessToken', newAccessToken);

    const retryResponse = await fetch(url, {
      method,
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`,
        ...(options.headers || {}),
      },
    });

    if (!retryResponse.ok) {
      return handleApiError(retryResponse);
    }

    return retryResponse.json();
  }

  if (!response.ok) {
    return handleApiError(response);
  }

  return response.json();
};
