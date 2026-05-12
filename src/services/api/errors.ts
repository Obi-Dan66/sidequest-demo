import axios from 'axios';
import { type ApiErrorShape } from '@/types/api';

export class ApiError extends Error implements ApiErrorShape {
  status: number;
  code?: string;
  details?: Record<string, unknown>;

  constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.name = 'ApiError';
    this.status = shape.status;
    this.code = shape.code;
    this.details = shape.details;
  }
}

interface ErrorPayload {
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Read a backend error response.
 *
 * The server wraps failures as `{ success: false, error: { code, message, details } }`,
 * but older code paths and 4xx middleware can also return a bare
 * `{ message, statusCode, error }` shape (NestJS HttpException default). We
 * read both gracefully.
 */
const readErrorPayload = (data: unknown): ErrorPayload => {
  if (!isRecord(data)) return {};

  const payload: ErrorPayload = {};

  if (isRecord(data.error)) {
    const inner = data.error;
    if (typeof inner.message === 'string') payload.message = inner.message;
    if (typeof inner.code === 'string') payload.code = inner.code;
    if (isRecord(inner.details)) payload.details = inner.details;
    return payload;
  }

  if (typeof data.message === 'string') payload.message = data.message;
  if (typeof data.code === 'string') payload.code = data.code;
  if (isRecord(data.details)) payload.details = data.details;
  return payload;
};

export const normalizeAxiosError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const payload = readErrorPayload(error.response?.data);
    return new ApiError({
      status,
      code: payload.code,
      message: payload.message ?? error.message ?? 'Network error',
      details: payload.details,
    });
  }

  if (error instanceof Error) {
    return new ApiError({ status: 0, message: error.message });
  }

  return new ApiError({ status: 0, message: 'Unknown error' });
};

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;
