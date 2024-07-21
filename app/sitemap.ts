import type { MetadataRoute } from "next";

import { fetchArticles } from "repositories/article/article.repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { results } = await fetchArticles();

  return results.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.id}`,
    lastModified: article.lastEditedTime,
  }));
}
