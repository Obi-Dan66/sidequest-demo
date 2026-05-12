import L from 'leaflet';
import { questCategoryMap } from '@/lib/categories';
import { type QuestCategory } from '@/types/quest';

const pinSvg = (hex: string, size: number) => `
<svg width="${size}" height="${size + 6}" viewBox="0 0 36 42" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.35))">
  <path d="M18 0C8.06 0 0 7.95 0 17.75c0 12.66 16.07 23.12 17.05 23.78a1.7 1.7 0 0 0 1.9 0C19.93 40.87 36 30.41 36 17.75 36 7.95 27.94 0 18 0z" fill="${hex}"/>
  <circle cx="18" cy="17.5" r="6.5" fill="white"/>
  <circle cx="18" cy="17.5" r="3.2" fill="${hex}"/>
</svg>`;

export interface QuestMapPinOptions {
  category: QuestCategory;
  emphasized?: boolean;
}

const iconCache = new Map<string, L.DivIcon>();

/**
 * Returns a Leaflet `DivIcon` styled as a SideQuest quest pin.
 * Cached per category+emphasis to avoid re-rendering markup on every render.
 */
export const createQuestPinIcon = ({ category, emphasized = false }: QuestMapPinOptions) => {
  const key = `${category}:${emphasized ? '1' : '0'}`;
  const existing = iconCache.get(key);
  if (existing) return existing;

  const meta = questCategoryMap[category];
  const size = emphasized ? 44 : 36;

  const icon = L.divIcon({
    html: pinSvg(meta.hex, size),
    className: 'sq-quest-pin',
    iconSize: [size, size + 6],
    iconAnchor: [size / 2, size + 6],
    popupAnchor: [0, -size + 4],
  });

  iconCache.set(key, icon);
  return icon;
};
