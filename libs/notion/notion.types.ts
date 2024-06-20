import type {
  PageObjectResponse as _PageObjectResponse,
  QueryDatabaseResponse as _QueryDatabaseResponse,
  QueryDatabaseParameters as _QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

import type { CamelcaseKeys } from "types/utils/camelcase-keys";
import type { Override } from "types/utils/override";

export type PageObjectResponse = CamelcaseKeys<_PageObjectResponse>;

export type QueryDatabaseResponse = CamelcaseKeys<_QueryDatabaseResponse>;

export type QueryDatabaseParameters = CamelcaseKeys<_QueryDatabaseParameters>;

export type Properties = PageObjectResponse["properties"];

export type PropertyValue = Properties[Lowercase<string>];

export type PropertyType = PropertyValue["type"];

export type Property<T extends PropertyType> = Extract<PropertyValue, { type: T }>;

export type Page<P extends Record<string, PropertyType>> = Override<
  PageObjectResponse,
  {
    properties: { [K in keyof P]: Property<P[K]> };
  }
>;

export type Database<P extends PageObjectResponse> = Override<
  QueryDatabaseResponse,
  {
    results: P[];
  }
>;
