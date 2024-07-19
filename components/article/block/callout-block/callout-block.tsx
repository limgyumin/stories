/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import type { BlockChild } from "libs/notion/notion.types";

import { RichText } from "../rich-text";

type Props = {
  block: BlockChild<"callout">;
};

export const CalloutBlock = ({ block }: Props) => {
  const { icon, richText } = block.callout;

  return (
    <div className="mt-3 py-1 md:mt-4">
      <div className="flex gap-3 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900 dark:text-gray-300">
        <div>{renderIcon(icon)}</div>
        <div>
          <RichText richText={richText} />
        </div>
      </div>
    </div>
  );
};

const renderIcon = (icon: BlockChild<"callout">["callout"]["icon"]): JSX.Element | null => {
  if (!icon) {
    return null;
  }

  switch (icon.type) {
    case "emoji":
      return <span>{icon.emoji}</span>;
    case "external":
      return <img src={icon.external.url} alt="" />;
    case "file":
      return <img src={icon.file.url} alt="" />;
  }
};
