import "server-only";

import { camelcaseKeys } from "utils/camelcase-keys";

import { client } from "./notion.client";
import type {
  BlockChild,
  BlockChildren,
  GetPageParameters,
  ListBlockChildrenParameters,
  PageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "./notion.types";

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

export const retrievePage = async <T extends PageObjectResponse>(options: GetPageParameters): Promise<T> => {
  const { pageId, filterProperties } = options;

  const response = await client.pages.retrieve({
    auth: process.env.NOTION_API_KEY,
    page_id: pageId,
    filter_properties: filterProperties,
  });

  return camelcaseKeys(response) as T;
};

export const retrieveBlockChildren = async (options: ListBlockChildrenParameters): Promise<BlockChildren> => {
  const { blockId, pageSize, startCursor } = options;

  const response = await client.blocks.children.list({
    auth: process.env.NOTION_API_KEY,
    block_id: blockId,
    page_size: pageSize,
    start_cursor: startCursor,
  });

  return camelcaseKeys(response) as BlockChildren;
};

export const retrieveBlockChildrenWithoutPagination = async (
  options: ListBlockChildrenParameters,
): Promise<BlockChildren> => {
  const response = await retrieveBlockChildren(options);

  if (response.hasMore && response.nextCursor) {
    const nextResponse = await retrieveBlockChildrenWithoutPagination({ ...options, startCursor: response.nextCursor });

    return {
      ...response,
      results: [...response.results, ...nextResponse.results],
    };
  }

  return response;
};

export const retrieveBlockChildrenDeep = async (options: ListBlockChildrenParameters): Promise<BlockChildren> => {
  const response = await retrieveBlockChildrenWithoutPagination(options);

  const results: BlockChild[] = [];

  for await (const result of response.results) {
    if (result.hasChildren) {
      const { results: children } = await retrieveBlockChildrenDeep({ ...options, blockId: result.id });

      results.push({ ...result, children });
    } else {
      results.push(result);
    }
  }

  return {
    ...response,
    results,
  };
};
