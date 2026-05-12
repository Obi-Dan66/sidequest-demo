export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface ApiErrorShape {
  status: number;
  code?: string;
  message: string;
  details?: Record<string, unknown>;
}
