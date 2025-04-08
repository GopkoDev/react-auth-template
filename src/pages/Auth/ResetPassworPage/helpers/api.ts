import { publicFetcher } from '../../../../lib/publicFetcher';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface ResetPasswordPayload {
  token: string;
  pin: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
  try {
    const data = await publicFetcher(
      `${API_BASE_URL}/api/auth/reset-password`,
      'POST',
      {
        body: JSON.stringify(payload),
      }
    );
    return data;
  } catch (error) {
    console.warn('[RESET PASSWORD ERROR]', error);
    throw error;
  }
};
