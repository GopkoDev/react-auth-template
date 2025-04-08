import { publicFetcher } from '../../../../lib/publicFetcher';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export interface RegistrationPayload {
  email: string;
  password: string;
  name?: string;
}

export type RegistrationResponse = {
  success: true;
  message: string;
  path: string;
};

export const registration = async (
  payload: RegistrationPayload
): Promise<RegistrationResponse> => {
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
    console.warn('[REGISTER ERROR]', error);
    throw error;
  }
};
