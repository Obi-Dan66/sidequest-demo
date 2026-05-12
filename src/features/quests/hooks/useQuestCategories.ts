import { useQuery } from '@tanstack/react-query';
import { questCategoriesApi } from '@/features/quests/api/categories.api';
import { queryKeys } from '@/lib/queryClient';
import { type QuestCategoryDto } from '@/types/dto';
import { type ApiError } from '@/services/api/errors';

export const useQuestCategories = () =>
  useQuery<QuestCategoryDto[], ApiError>({
    queryKey: queryKeys.questCategories.list,
    queryFn: () => questCategoriesApi.list(),
  });

export const useQuestCategory = (slug: string | undefined) =>
  useQuery<QuestCategoryDto, ApiError>({
    queryKey: queryKeys.questCategories.detail(slug ?? ''),
    queryFn: () => questCategoriesApi.getBySlug(slug ?? ''),
    enabled: Boolean(slug),
  });
