export type ArticleOrigin = 'human' | 'ai';

export const ORIGIN_LABELS: Record<ArticleOrigin, string> = {
  human: 'Escrito por persona',
  ai: 'Generado con IA',
};

export const ORIGIN_HINTS: Record<ArticleOrigin, string> = {
  human: 'Texto escrito y revisado por una persona.',
  ai: 'Texto generado o asistido por IA; revisado antes de publicar.',
};

export function getOriginLabel(origin: ArticleOrigin = 'human'): string {
  return ORIGIN_LABELS[origin];
}

export function getOriginHint(origin: ArticleOrigin = 'human'): string {
  return ORIGIN_HINTS[origin];
}
