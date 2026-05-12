/**
 * Backend response envelope (NestJS global interceptor wraps all responses).
 *
 * - Success: `{ success: true, data, meta? }`
 * - Failure: `{ success: false, error: { code, message, details? } }`
 */
export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: ApiMeta;
}

export interface ApiMeta {
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiErrorEnvelope {
  success: false;
  error: ApiErrorBody;
}

export interface ApiErrorBody {
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
}

export interface ApiErrorShape {
  status: number;
  code?: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ListQuery {
  page?: number;
  limit?: number;
  search?: string;
}
