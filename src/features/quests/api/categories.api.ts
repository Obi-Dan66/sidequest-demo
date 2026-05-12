import { http } from '@/services/api';
import { type QuestCategoryDto } from '@/types/dto';

export const questCategoriesApi = {
  list(): Promise<QuestCategoryDto[]> {
    return http.get<QuestCategoryDto[]>('/quest-categories');
  },

  getBySlug(slug: string): Promise<QuestCategoryDto> {
    return http.get<QuestCategoryDto>(`/quest-categories/${slug}`);
  },
};
