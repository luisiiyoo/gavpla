/**
 * Bulb track inside channel letters (viewBox 0 0 100 112).
 * Blocky shapes with smooth corners — vintage marquee “SIGN” style.
 */
export type LetterPathDef = string | readonly string[];

const FALLBACK = 'M 14 18 L 86 18 L 86 94 L 14 94 Z';

export const BULB_LETTER_PATHS: Record<string, LetterPathDef> = {
  /* Block G — open C + horizontal bar */
  G: [
    'M 82 38 C 82 24 66 17 48 17 C 24 17 15 32 15 55 C 15 78 28 94 52 94 C 74 94 85 80 85 60 L 85 48 L 56 48 L 56 58 L 74 58 C 74 74 66 84 50 84 C 32 84 24 68 24 52 C 24 36 36 26 52 26 C 68 26 78 32 82 38',
  ],

  /* A — legs + crossbar */
  A: ['M 22 94 L 50 18 L 78 94', 'M 38 60 L 62 60'],

  V: 'M 18 22 L 50 100 L 82 22',

  /* P — full stem loop */
  P: 'M 24 94 L 24 22 L 54 22 Q 80 22 80 46 Q 80 68 54 68 L 24 68 L 24 94',

  L: 'M 30 22 L 30 88 L 80 88',
};

export function getBulbPathsForLetter(char: string): string[] {
  const c = char.toUpperCase();
  const def = BULB_LETTER_PATHS[c];
  if (!def) {
    return [FALLBACK];
  }
  return typeof def === 'string' ? [def] : [...def];
}
