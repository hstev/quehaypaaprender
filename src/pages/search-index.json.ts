import type { APIRoute } from 'astro';
import { getPublishedArticles, buildSearchIndex } from '../lib/articles';

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();
  const index = buildSearchIndex(articles);

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
