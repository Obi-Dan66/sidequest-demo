import { useQuery } from '@tanstack/react-query';
import {
  businessMetricsApi,
  type BusinessMetricsQuery,
  type BusinessTopQuestsQuery,
} from '@/features/businesses/api/business-metrics.api';
import { queryKeys } from '@/lib/queryClient';
import { type ApiError } from '@/services/api/errors';
import { type BusinessDto, type BusinessMetricsDto, type BusinessTopQuestDto } from '@/types';

export const useMyBusiness = (enabled = true) =>
  useQuery<BusinessDto, ApiError>({
    queryKey: queryKeys.businessMetrics.me,
    queryFn: () => businessMetricsApi.myBusiness(),
    enabled,
    retry: false,
  });

export const useBusinessMetrics = (query: BusinessMetricsQuery = {}, enabled = true) =>
  useQuery<BusinessMetricsDto, ApiError>({
    queryKey: queryKeys.businessMetrics.metrics(query),
    queryFn: () => businessMetricsApi.metrics(query),
    enabled,
    retry: false,
  });

export const useBusinessTopQuests = (query: BusinessTopQuestsQuery = {}, enabled = true) =>
  useQuery<BusinessTopQuestDto[], ApiError>({
    queryKey: queryKeys.businessMetrics.topQuests(query),
    queryFn: () => businessMetricsApi.topQuests(query),
    enabled,
    retry: false,
  });
