import { http } from '@/services/api';
import { type BusinessDto, type CreateBusinessDto } from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';

export const businessesApi = {
  list(query: ListQuery = {}): Promise<PaginatedResponse<BusinessDto>> {
    return http.getPaginated<BusinessDto>('/businesses', { params: query });
  },

  getById(id: string): Promise<BusinessDto> {
    return http.get<BusinessDto>(`/businesses/${id}`);
  },

  create(payload: CreateBusinessDto): Promise<BusinessDto> {
    return http.post<BusinessDto, CreateBusinessDto>('/businesses', payload);
  },
};
