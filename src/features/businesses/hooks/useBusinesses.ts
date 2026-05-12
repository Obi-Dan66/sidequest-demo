import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { businessesApi } from '@/features/businesses/api/businesses.api';
import { queryKeys } from '@/lib/queryClient';
import { type BusinessDto, type CreateBusinessDto } from '@/types/dto';
import { type ListQuery, type PaginatedResponse } from '@/types/api';
import { type ApiError } from '@/services/api/errors';

export const useBusinesses = (query: ListQuery = {}) =>
  useQuery<PaginatedResponse<BusinessDto>, ApiError>({
    queryKey: queryKeys.businesses.list(query),
    queryFn: () => businessesApi.list(query),
  });

export const useBusiness = (id: string | undefined) =>
  useQuery<BusinessDto, ApiError>({
    queryKey: queryKeys.businesses.detail(id ?? ''),
    queryFn: () => businessesApi.getById(id ?? ''),
    enabled: Boolean(id),
  });

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation<BusinessDto, ApiError, CreateBusinessDto>({
    mutationFn: (payload) => businessesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};
