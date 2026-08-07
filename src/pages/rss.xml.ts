import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedArticles, getArticleHref } from '../lib/articles';

export async function GET(context: APIContext) {
  const articles = await getPublishedArticles();

  return rss({
    title: "Que hay pa' aprender?",
    description: 'Conocimiento para todos. Gratis, abierto y sin humo.',
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: getArticleHref(article),
      categories: [article.data.category, ...article.data.tags],
    })),
    customData: `<language>es-co</language>`,
  });
}
