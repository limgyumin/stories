import type { BlockChild, RichTextChildren } from "libs/notion/notion.types";
import { cx } from "utils/cx";

import { RichText } from "../rich-text";

type HeadingBlockChild = BlockChild<"heading_1" | "heading_2" | "heading_3">;

type HeadingBlockChildType = HeadingBlockChild["type"];

type Props = {
  blocks: HeadingBlockChild[];
};

export const TableOfContentsBlock = ({ blocks }: Props) => {
  return (
    <ul className="border-l-2 border-muted-foreground py-0.5 pl-6">
      {blocks.map((block) => (
        <li key={block.id} className={cx("mt-1.5 first:!mt-0", styleMap[block.type])}>
          <a href={`#${block.id}`} className="text-sm text-gray-500 underline">
            <RichText richText={getRichText(block)} />
          </a>
        </li>
      ))}
    </ul>
  );
};

const getRichText = (block: HeadingBlockChild): RichTextChildren => {
  switch (block.type) {
    case "heading_1":
      return block.heading1.richText;
    case "heading_2":
      return block.heading2.richText;
    case "heading_3":
      return block.heading3.richText;
  }
};

const styleMap: Record<HeadingBlockChildType, string> = {
  heading_1: "pl-0",
  heading_2: "pl-4",
  heading_3: "pl-8",
};
