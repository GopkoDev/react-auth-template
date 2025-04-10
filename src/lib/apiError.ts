interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: {
    [key: string]: unknown;
  };
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: ApiErrorResponse | string
  ) {
    const message = typeof data === 'object' ? data.error : String(data);
    super(message);
    this.name = 'ApiError';
  }
}

export async function handleApiError(response: Response) {
  try {
    const errorData = await response.json();
    throw new ApiError(response.status, response.statusText, errorData);
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new ApiError(
        response.status,
        response.statusText,
        response.statusText
      );
    }
    throw e;
  }
}

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.data && typeof error.data === 'object' && 'error' in error.data) {
      return String(error.data.error);
    }
    return error.message || error.statusText;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};
