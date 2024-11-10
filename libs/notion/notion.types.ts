import type {
  PageObjectResponse as _PageObjectResponse,
  QueryDatabaseResponse as _QueryDatabaseResponse,
  QueryDatabaseParameters as _QueryDatabaseParameters,
  GetPageParameters as _GetPageParameters,
  ListBlockChildrenParameters as _ListBlockChildrenParameters,
  ListBlockChildrenResponse as _ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";

import type { Dimensions } from "types/dimensions";
import type { CamelcaseKeys } from "types/utils/camelcase-keys";
import type { Override } from "types/utils/override";

export type PageObjectResponse = CamelcaseKeys<_PageObjectResponse>;

export type QueryDatabaseResponse = CamelcaseKeys<_QueryDatabaseResponse>;

export type QueryDatabaseParameters = CamelcaseKeys<_QueryDatabaseParameters>;

export type GetPageParameters = CamelcaseKeys<_GetPageParameters>;

export type ListBlockChildrenParameters = CamelcaseKeys<_ListBlockChildrenParameters>;

export type ListBlockChildrenResponse = CamelcaseKeys<_ListBlockChildrenResponse>;

export type ListBlockChildrenResults = ListBlockChildrenResponse["results"];

export type BlockChildWithType = Extract<ListBlockChildrenResults[number], { type: string }>;

export type BlockChildType = BlockChildWithType["type"];

export type RichTextChildren = Property<"rich_text">["richText"];

export type RichTextChild = RichTextChildren[number];

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

type ImageMeta = Dimensions & {
  url: string;
};

type ImageBlockChild = Extract<BlockChildWithType, { type: "image" }>;

type ImageBlockChildWithMeta = Override<
  ImageBlockChild,
  {
    image: ImageBlockChild["image"] & ImageMeta;
  }
>;

export type OverrideBlockChild<T extends BlockChildWithType> = Exclude<BlockChildWithType, { type: T["type"] }> | T;

export type BlockChild<T extends BlockChildType = BlockChildType> = Extract<
  OverrideBlockChild<ImageBlockChildWithMeta>,
  {
    type: T;
  }
> & {
  children?: BlockChild[];
};

export type BlockChildren = Override<
  ListBlockChildrenResponse,
  {
    results: BlockChild[];
  }
>;
