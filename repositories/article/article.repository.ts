import "server-only";

import type { Database, Page, QueryDatabaseParameters } from "libs/notion/notion.types";
import { queryDatabase } from "libs/notion/notion.api";
import { cache } from "react";

export type ArticlesOptions = Pick<QueryDatabaseParameters, "pageSize" | "startCursor">;

export type Article = Page<{
  Title: "title";
  Description: "rich_text";
  Status: "select";
}>;

export type ArticleDatabase = Database<Article>;

const DEFAULT_PAGE_SIZE = 50;

export const fetchArticles = cache((options?: ArticlesOptions) => {
  const { pageSize = DEFAULT_PAGE_SIZE, startCursor } = options ?? {};

  return queryDatabase<ArticleDatabase>({
    databaseId: process.env.DATABASE_ID,
    pageSize,
    startCursor,
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "Published",
          },
        },
      ],
    },
    sorts: [
      {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    ],
  });
});
