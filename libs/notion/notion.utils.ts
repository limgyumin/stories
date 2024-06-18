import type { PageObjectResponse, Property } from "./notion.types";

export const getPlainText = (property: Property<"rich_text" | "title">): string => {
  if (property.type === "rich_text") {
    return property.richText[0]?.plainText || "";
  } else {
    return property.title[0]?.plainText || "";
  }
};

export const getCoverImageUrl = (cover: PageObjectResponse["cover"]): string | undefined => {
  if (cover?.type === "external") {
    return cover.external.url;
  }

  return cover?.file.url;
};
