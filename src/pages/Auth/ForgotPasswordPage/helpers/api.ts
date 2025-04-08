import { publicFetcher } from '../../../../lib/publicFetcher';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  email: string;
  path: string;
}

export const forgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
  try {
    const data = await publicFetcher(
      `${API_BASE_URL}/api/auth/forgot-password`,
      'POST',
      {
        body: JSON.stringify(payload),
      }
    );
    return data;
  } catch (error) {
    console.warn('[FORGOT PASSWORD ERROR]', error);
    throw error;
  }
};
