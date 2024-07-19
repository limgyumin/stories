import React from "react";

import type { RichTextChildren } from "libs/notion/notion.types";

import { RichText } from "../rich-text";

type Props = {
  caption: RichTextChildren;
};

export const Caption = ({ caption }: Props) => {
  if (caption.length === 0) {
    return null;
  }

  return (
    <div className="text-sm font-light text-gray-500 dark:text-gray-500">
      <RichText richText={caption} />
    </div>
  );
};
