import "server-only";

import { camelcaseKeys } from "utils/camelcase-keys";

import { client } from "./notion.client";
import type { QueryDatabaseParameters, QueryDatabaseResponse } from "./notion.types";

export const queryDatabase = async <T extends QueryDatabaseResponse>(options: QueryDatabaseParameters): Promise<T> => {
  const { databaseId, pageSize, startCursor, sorts, filter } = options;

  const response = await client.databases.query({
    database_id: databaseId,
    auth: process.env.NOTION_API_KEY,
    page_size: pageSize,
    start_cursor: startCursor,
    sorts,
    filter,
  });

  return camelcaseKeys(response) as T;
};
