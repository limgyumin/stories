import "server-only";

import { cache } from "react";

import { queryDatabase, retrieveBlockChildrenDeep, retrievePage } from "libs/notion/notion.api";
import type { BlockChildren, Database, Page, QueryDatabaseParameters } from "libs/notion/notion.types";
import { transformArticleBody } from "transformers/article/article.transformer";

export type ArticlesOptions = Pick<QueryDatabaseParameters, "pageSize" | "startCursor">;

export type Article = Page<{
  title: "title";
  description: "rich_text";
  status: "select";
  series: "select";
  publishedAt: "date";
}>;

export type ArticleDatabase = Database<Article>;

const DEFAULT_PAGE_SIZE = 50;

export const fetchArticles = cache((options?: ArticlesOptions): Promise<ArticleDatabase> => {
  const { pageSize = DEFAULT_PAGE_SIZE, startCursor } = options ?? {};

  return queryDatabase<ArticleDatabase>({
    databaseId: process.env.DATABASE_ID,
    pageSize,
    startCursor,
    filter: {
      and: [
        {
          property: "status",
          select: {
            equals: "Published",
          },
        },
      ],
    },
    sorts: [
      {
        property: "publishedAt",
        direction: "descending",
      },
    ],
  });
});

export const fetchArticle = cache((pageId: string): Promise<Article> => retrievePage<Article>({ pageId }));

export const fetchArticleBody = cache(async (blockId: string): Promise<BlockChildren> => {
  const response = await retrieveBlockChildrenDeep({ blockId, pageSize: 100 });

  return transformArticleBody(response);
});
