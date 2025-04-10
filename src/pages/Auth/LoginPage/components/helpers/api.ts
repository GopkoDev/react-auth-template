import { ApiError } from '../../../../../lib/apiError';
import { publicFetcher } from '../../../../../lib/publicFetcher';
import { User } from '../../../../../types/user-types';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface LoginPayload {
  email: string;
  password: string;
  mfaToken?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  requiresTwoFactor?: boolean;
  error?: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const data = await publicFetcher(`${API_BASE_URL}/api/auth/login`, 'POST', {
      body: JSON.stringify(payload),
    });
    return data; // { accessToken, refreshToken, user }
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 401 &&
      typeof error.data === 'object' &&
      error.data.details?.requiresTwoFactor
    ) {
      return { requiresTwoFactor: true } as LoginResponse;
    } else {
      console.warn('[LOGIN ERROR]', error);
    }
    throw error;
  }
};
