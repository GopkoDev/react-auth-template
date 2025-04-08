import { publicFetcher } from '../../../../lib/publicFetcher';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface VerifyEmailPayload {
  token: string;
  pin: string;
}

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
    console.warn('[VERIFY EMAIL ERROR]', error);
    throw error;
  }
};

export interface ResendVerifyEmailPayload {
  email: string;
}

export const resendVerifyEmail = async (payload: ResendVerifyEmailPayload) => {
  try {
    const data = await publicFetcher(
      `${API_BASE_URL}/api/auth/resend-verify-mail`,
      'POST',
      {
        body: JSON.stringify(payload),
      }
    );
    return data;
  } catch (error) {
    console.warn('[RESEND VERIFY EMAIL ERROR]', error);
    throw error;
  }
};
