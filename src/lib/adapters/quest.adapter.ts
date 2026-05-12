import { type QuestDto, type QuestDifficultyDto, type QuestLocationDto } from '@/types/dto';
import {
  type Quest,
  type QuestCategory,
  type QuestDifficulty,
  type QuestStep,
} from '@/types/quest';
import { type GeoPoint } from '@/types/place';

const difficultyMap: Record<QuestDifficultyDto, QuestDifficulty> = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  EPIC: 'legendary',
};

const knownCategories: ReadonlySet<QuestCategory> = new Set([
  'exploration',
  'history',
  'food',
  'nature',
  'culture',
  'nightlife',
]);

const isQuestCategory = (value: unknown): value is QuestCategory =>
  typeof value === 'string' && knownCategories.has(value as QuestCategory);

interface QuestDtoMaybeWithCategory extends QuestDto {
  /** Some backends serialize a flat slug alongside the relation. */
  categorySlug?: string | null;
}

const readCategorySlug = (dto: QuestDtoMaybeWithCategory): QuestCategory => {
  const slug = dto.categorySlug ?? dto.category?.slug ?? null;
  return isQuestCategory(slug) ? slug : 'exploration';
};

const toStep = (location: QuestLocationDto): QuestStep => ({
  id: location.id,
  title: location.name ?? `Stop ${location.orderIndex + 1}`,
  description: location.address ?? undefined,
  target: { lat: location.latitude, lng: location.longitude },
  isCompleted: false,
});

const firstStartLocation = (locations: QuestLocationDto[] | undefined): GeoPoint => {
  const sorted = (locations ?? []).slice().sort((a, b) => a.orderIndex - b.orderIndex);
  const first = sorted[0];
  return first ? { lat: first.latitude, lng: first.longitude } : { lat: 50.0875, lng: 14.4213 };
};

export const toQuest = (raw: QuestDto): Quest => {
  const dto: QuestDtoMaybeWithCategory = raw;
  const locations = (dto.locations ?? []).slice().sort((a, b) => a.orderIndex - b.orderIndex);

  const distanceKm =
    typeof dto.distanceM === 'number' ? dto.distanceM / 1000 : Math.max(0, locations.length * 0.5);

  return {
    id: dto.id,
    title: dto.title,
    summary: dto.summary ?? dto.description.slice(0, 140),
    description: dto.description,
    category: readCategorySlug(dto),
    difficulty: difficultyMap[dto.difficulty],
    status: 'available',
    estimatedMinutes: dto.estimatedDurationMin ?? 30,
    distanceKm,
    coverImageUrl: dto.coverImageUrl ?? dto.imageUrl ?? undefined,
    startLocation: firstStartLocation(locations),
    steps: locations.map(toStep),
    reward: {
      xp: dto.xpReward,
      achievementIds: dto.rewards?.achievements.map((a) => a.id),
    },
    tags: dto.tags ?? [],
    participants: (dto.participants ?? []).map((p) => ({
      id: p.id,
      username: p.username,
      avatarUrl: p.avatarUrl ?? undefined,
      level: p.level,
    })),
    participantCount: dto.participantCount ?? dto.participants?.length ?? 0,
    rating: dto.rating ?? undefined,
    createdAt: dto.createdAt,
  };
};
