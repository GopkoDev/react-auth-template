import { userStore } from '../store/user-store';

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
      window.location.href = '/login';
      throw new Error('Failed to refresh token');
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
      throw new Error(
        `Error: ${retryResponse.status} ${retryResponse.statusText}`
      );
    }

    return retryResponse.json();
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
