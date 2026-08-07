import { getCollection, type CollectionEntry } from 'astro:content';
import { getCategoryByName, slugifyCategory } from './categories';
import { readingTimeMinutes } from './utils';

export type ArticleEntry = CollectionEntry<'articles'>;

export async function getPublishedArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

export async function getFeaturedArticles(limit = 3): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.data.featured).slice(0, limit);
}

export async function getPopularArticles(limit = 4): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  const popular = articles.filter((a) => a.data.popular);
  return (popular.length ? popular : articles).slice(0, limit);
}

export async function getRecentArticles(limit = 6): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  return articles.slice(0, limit);
}

export async function getArticlesByCategory(categoryNameOrSlug: string): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  const slug = slugifyCategory(categoryNameOrSlug);
  return articles.filter((a) => slugifyCategory(a.data.category) === slug);
}

export async function getRelatedArticles(
  article: ArticleEntry,
  limit = 3,
): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  const categorySlug = slugifyCategory(article.data.category);
  const tagSet = new Set(article.data.tags.map((t) => t.toLowerCase()));

  return articles
    .filter((a) => a.id !== article.id)
    .map((a) => {
      let score = 0;
      if (slugifyCategory(a.data.category) === categorySlug) score += 3;
      for (const tag of a.data.tags) {
        if (tagSet.has(tag.toLowerCase())) score += 1;
      }
      return { article: a, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.article.data.publishedAt.valueOf() - a.article.data.publishedAt.valueOf())
    .slice(0, limit)
    .map((x) => x.article);
}

export function getArticleReadingTime(body: string | undefined): number {
  return readingTimeMinutes(body ?? '');
}

export function getArticleHref(article: ArticleEntry): string {
  return `/articulos/${article.id}/`;
}

export function getCategoryHref(categoryName: string): string {
  return `/categorias/${getCategoryByName(categoryName).slug}/`;
}

export async function getUsedCategories() {
  const articles = await getPublishedArticles();
  const counts = new Map<string, number>();

  for (const article of articles) {
    const meta = getCategoryByName(article.data.category);
    counts.set(meta.slug, (counts.get(meta.slug) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([slug, count]) => ({
      ...getCategoryByName(slug),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'es'));
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const articles = await getPublishedArticles();
  const counts = new Map<string, number>();

  for (const article of articles) {
    for (const tag of article.data.tags) {
      const key = tag.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'es'));
}

export function buildSearchIndex(articles: ArticleEntry[]) {
  return articles.map((article) => ({
    id: article.id,
    title: article.data.title,
    description: article.data.description,
    category: article.data.category,
    tags: article.data.tags,
    href: getArticleHref(article),
    publishedAt: article.data.publishedAt.toISOString(),
  }));
}
