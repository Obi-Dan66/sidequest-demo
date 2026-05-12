import { type AxiosRequestConfig } from 'axios';
import { api } from '@/services/api/client';
import { type ApiEnvelope, type PaginatedResponse, type PaginationMeta } from '@/types/api';

/**
 * Typed HTTP helpers that hide the `{ success, data, meta }` envelope so
 * every API method stays one line.
 *
 * Usage:
 *   const quest = await http.get<QuestDto>(`/quests/${id}`);
 *   const list  = await http.getPaginated<QuestDto>('/quests', { params });
 *   await http.post('/quests/abc/start');
 */
const defaultPagination: PaginationMeta = {
  page: 1,
  limit: 0,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrev: false,
};

export const http = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<ApiEnvelope<T>>(url, config);
    return response.data.data;
  },

  async getPaginated<T>(url: string, config?: AxiosRequestConfig): Promise<PaginatedResponse<T>> {
    const response = await api.get<ApiEnvelope<T[]>>(url, config);
    return {
      data: response.data.data,
      pagination: response.data.meta?.pagination ?? defaultPagination,
    };
  },

  async post<TResult, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResult> {
    const response = await api.post<ApiEnvelope<TResult>>(url, body, config);
    return response.data.data;
  },

  /** POST that ignores the response body (204 / 201-no-body endpoints). */
  async postVoid<TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<void> {
    await api.post(url, body, config);
  },

  async patch<TResult, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResult> {
    const response = await api.patch<ApiEnvelope<TResult>>(url, body, config);
    return response.data.data;
  },

  async patchVoid<TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<void> {
    await api.patch(url, body, config);
  },

  async delete<TResult = void>(url: string, config?: AxiosRequestConfig): Promise<TResult> {
    const response = await api.delete<ApiEnvelope<TResult>>(url, config);
    return response.data?.data;
  },

  async deleteVoid(url: string, config?: AxiosRequestConfig): Promise<void> {
    await api.delete(url, config);
  },
};
