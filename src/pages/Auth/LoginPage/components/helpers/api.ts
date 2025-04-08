import { publicFetcher } from '../../../../../lib/publicFetcher';
import { User } from '../../../../../types/user-types';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const data = await publicFetcher(`${API_BASE_URL}/api/auth/login`, 'POST', {
      body: JSON.stringify(payload),
    });
    console.log(data);
    return data; // { accessToken, refreshToken, user }
  } catch (error) {
    console.warn('[LOGIN ERROR]', error);
    throw error;
  }
};
