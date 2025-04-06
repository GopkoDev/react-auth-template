import { publicFetcher } from '../lib/publicFetcher';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface RegistrationPayload {
  email: string;
  password: string;
  name?: string;
}

export interface VerifyEmailPayload {
  token: string;
  pin: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registration = async (payload: RegistrationPayload) => {
  try {
    const data = await publicFetcher(
      `${API_BASE_URL}/api/auth/register`,
      'POST',
      {
        body: JSON.stringify(payload),
      }
    );
    return data;
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    throw error;
  }
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  try {
    const data = await publicFetcher(
      `${API_BASE_URL}/api/auth/verify-mail`,
      'POST',
      {
        body: JSON.stringify(payload),
      }
    );

    return data;
  } catch (error) {
    console.error('[VERIFY EMAIL ERROR]', error);
    throw error;
  }
};

export const login = async (payload: LoginPayload) => {
  try {
    const data = await publicFetcher(`${API_BASE_URL}/api/auth/login`, 'POST', {
      body: JSON.stringify(payload),
    });
    return data; // { accessToken, refreshToken, user }
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    throw error;
  }
};
