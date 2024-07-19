import type { BlockChild, RichTextChildren } from "libs/notion/notion.types";
import { alphabetize } from "utils/alpabetize";
import { cx } from "utils/cx";
import { romanize } from "utils/romanize";
import { stringify } from "utils/stringify";

import { RichText } from "../rich-text";

type ListItemBlockChild = BlockChild<"bulleted_list_item" | "numbered_list_item">;

type Props = {
  block: ListItemBlockChild;
  depth: number;
  index?: number;
};

export const ListItemBlock = ({ block, depth, index = 0 }: Props) => {
  return (
    <div className={cx("flex py-1.5")}>
      <div>
        <div className="mr-0.5 flex min-w-6 items-center justify-center">{getMarker(block, depth, index)}</div>
      </div>

      <div>
        <RichText richText={getRichText(block)} />
      </div>
    </div>
  );
};

const getRichText = (block: ListItemBlockChild): RichTextChildren => {
  switch (block.type) {
    case "bulleted_list_item":
      return block.bulletedListItem.richText;
    case "numbered_list_item":
      return block.numberedListItem.richText;
  }
};

const getMarker = (block: ListItemBlockChild, depth: number, index: number): string => {
  switch (block.type) {
    case "bulleted_list_item":
      return getBulledListItemMarker(depth);
    case "numbered_list_item":
      return getNumberedListItemMarker(depth, index);
  }
};

const transformers = [stringify, alphabetize, romanize] as const;

const getNumberedListItemMarker = (depth: number, index: number): string => {
  const transformer = transformers[depth % 3];

  return `${transformer?.(index + 1) ?? ""}.`;
};

const bullets = ["•", "◦", "▪"] as const;

const getBulledListItemMarker = (depth: number): string => bullets[depth % 3] ?? bullets[0];
