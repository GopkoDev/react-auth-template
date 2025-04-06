import { handleApiError } from './apiError';

export const publicFetcher = async (
  url: string,
  method: string = 'GET',
  options: RequestInit = {}
) => {
  const response = await fetch(url, {
    method,
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    return handleApiError(response);
  }

  return response.json();
};
