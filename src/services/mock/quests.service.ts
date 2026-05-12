import { fakeDelay } from '@/services/mock/delay';
import { mockQuests, findQuestById } from '@/lib/mock/quests.mock';
import { type Quest, type QuestCategory } from '@/types/quest';

export interface QuestListFilters {
  category?: QuestCategory | 'all';
  search?: string;
}

export const mockQuestsService = {
  async list(filters: QuestListFilters = {}): Promise<Quest[]> {
    await fakeDelay();
    const { category = 'all', search = '' } = filters;
    const normalizedSearch = search.trim().toLowerCase();

    return mockQuests.filter((quest) => {
      const matchesCategory = category === 'all' || quest.category === category;
      const matchesSearch =
        !normalizedSearch ||
        quest.title.toLowerCase().includes(normalizedSearch) ||
        quest.summary.toLowerCase().includes(normalizedSearch) ||
        quest.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      return matchesCategory && matchesSearch;
    });
  },

  async detail(id: string): Promise<Quest> {
    await fakeDelay();
    const quest = findQuestById(id);
    if (!quest) {
      throw new Error(`Quest "${id}" not found`);
    }
    return quest;
  },

  async nearby(): Promise<Quest[]> {
    await fakeDelay(250);
    return mockQuests.slice(0, 4);
  },
};
