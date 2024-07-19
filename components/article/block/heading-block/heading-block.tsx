import type { ElementType } from "react";

import { Element } from "components/layout/element";
import type { BlockChild, RichTextChildren } from "libs/notion/notion.types";
import { cx } from "utils/cx";

import { RichText } from "../rich-text";

type HeadingBlockChild = BlockChild<"heading_1" | "heading_2" | "heading_3">;

type HeadingBlockChildType = HeadingBlockChild["type"];

type Props = {
  block: HeadingBlockChild;
};

export const HeadingBlock = ({ block }: Props) => {
  return (
    <Element
      as={elementTypeMap[block.type]}
      className={cx("font-semibold first:!mt-0 dark:text-gray-300", styleMap[block.type])}
    >
      <RichText richText={getRichText(block)} />
    </Element>
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

const elementTypeMap: Record<HeadingBlockChildType, ElementType> = {
  heading_1: "h1",
  heading_2: "h2",
  heading_3: "h3",
};

const styleMap: Record<HeadingBlockChildType, string> = {
  heading_1: "md:text-3xl text-2xl mt-8 mb-1",
  heading_2: "md:text-2xl text-xl mt-6 mb-[1px]",
  heading_3: "md:text-xl text-lg mt-4 mb-[1px]",
};
