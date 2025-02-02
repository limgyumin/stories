import { ArticleStatus } from "constants/article/status";
import type { Article } from "repositories/article/article.repository";

export const isPublished = (article: Pick<Article, "properties">): boolean => {
  return article.properties.status.select?.name === ArticleStatus.Published;
};
