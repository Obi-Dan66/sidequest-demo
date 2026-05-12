import { http } from '@/services/api';
import {
  type BusinessDto,
  type BusinessMetricsDto,
  type BusinessMetricsPeriod,
  type BusinessTopQuestDto,
} from '@/types';

export interface BusinessMetricsQuery {
  period?: BusinessMetricsPeriod;
}

export interface BusinessTopQuestsQuery extends BusinessMetricsQuery {
  limit?: number;
}

/** Planned — see FEATURES.md §12. */
export const businessMetricsApi = {
  myBusiness(): Promise<BusinessDto> {
    return http.get<BusinessDto>('/businesses/me');
  },

  metrics(query: BusinessMetricsQuery = {}): Promise<BusinessMetricsDto> {
    return http.get<BusinessMetricsDto>('/businesses/me/metrics', { params: query });
  },

  topQuests(query: BusinessTopQuestsQuery = {}): Promise<BusinessTopQuestDto[]> {
    return http.get<BusinessTopQuestDto[]>('/businesses/me/quests/top', { params: query });
  },
};
