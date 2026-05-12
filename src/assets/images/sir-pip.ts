import bustUrl from '@/assets/images/sir-pip-bust.png';
import heroUrl from '@/assets/images/sir-pip-hero.png';
import wavingUrl from '@/assets/images/sir-pip-waving.png';
import celebratingUrl from '@/assets/images/sir-pip-celebrating.png';

/**
 * Sir Pip — the SideQuest mascot AND brand mark.
 * Always import poses from this registry so we have one place to update if
 * the artwork ever changes.
 */
export const sirPip = {
  /** Tight head + shoulders. Use for logo, avatar, favicon, navbar mark. */
  bust: bustUrl,
  /** Full body, standing with sword & shield. Marketing / hero sections. */
  hero: heroUrl,
  /** Full body, waving hello. Auth screens, empty states, onboarding. */
  waving: wavingUrl,
  /** Full body, sword raised, sparkles. Achievement / level-up / success. */
  celebrating: celebratingUrl,
} as const;

export type SirPipPose = keyof typeof sirPip;
