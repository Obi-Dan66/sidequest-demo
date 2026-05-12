import {
  Camera,
  Coffee,
  Compass,
  Landmark,
  Moon,
  Palette,
  Trees,
  type LucideIcon,
} from 'lucide-react';
import { type QuestCategory } from '@/types/quest';

export interface QuestCategoryMeta {
  id: QuestCategory;
  label: string;
  icon: LucideIcon;
  /** Tailwind text + bg utility classes for chips, pins, badges */
  badgeClass: string;
  /** Hex color (used for map pins) */
  hex: string;
}

export const questCategoryList: QuestCategoryMeta[] = [
  {
    id: 'exploration',
    label: 'Explore',
    icon: Compass,
    badgeClass: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
    hex: '#0ea5e9',
  },
  {
    id: 'history',
    label: 'History',
    icon: Landmark,
    badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-300',
    hex: '#f59e0b',
  },
  {
    id: 'food',
    label: 'Food',
    icon: Coffee,
    badgeClass: 'bg-orange-500/15 text-orange-600 dark:text-orange-300',
    hex: '#f97316',
  },
  {
    id: 'nature',
    label: 'Nature',
    icon: Trees,
    badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
    hex: '#10b981',
  },
  {
    id: 'culture',
    label: 'Culture',
    icon: Palette,
    badgeClass: 'bg-violet-500/15 text-violet-600 dark:text-violet-300',
    hex: '#8b5cf6',
  },
  {
    id: 'nightlife',
    label: 'Nightlife',
    icon: Moon,
    badgeClass: 'bg-pink-500/15 text-pink-600 dark:text-pink-300',
    hex: '#ec4899',
  },
];

export const questCategoryMap: Record<QuestCategory, QuestCategoryMeta> = questCategoryList.reduce<
  Record<QuestCategory, QuestCategoryMeta>
>(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {
    exploration: questCategoryList[0],
    history: questCategoryList[1],
    food: questCategoryList[2],
    nature: questCategoryList[3],
    culture: questCategoryList[4],
    nightlife: questCategoryList[5],
  },
);

export const fallbackCategoryIcon = Camera;
