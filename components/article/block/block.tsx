import type { ReactNode } from "react";

import type { BlockChild } from "libs/notion/notion.types";
import { takeRightWhile } from "utils/take-right-while";

import { CalloutBlock } from "./callout-block";
import { CodeBlock } from "./code-block";
import { ColumnBlock } from "./column-block/column-block";
import { ColumnListBlock } from "./column-list-block";
import { DividerBlock } from "./divider-block";
import { HeadingBlock } from "./heading-block";
import { ImageBlock } from "./image-block";
import { ListItemBlock } from "./list-item-block";
import { ParagraphBlock } from "./paragraph-block";
import { QuoteBlock } from "./quote-block";

type Props = {
  block: BlockChild;
  blocks: BlockChild[];
  index: number;
  depth?: number;
  isChild?: boolean;
};

export const Block = ({ block, blocks, index, depth = 0, isChild = false }: Props) => {
  const { children = [] } = block;

  const hasChildren = children.length > 0;

  const isColumn = block.type === "column";

  return (
    <>
      {render(block, blocks, index, depth, isChild)}

      {hasChildren ? renderWithHierarchy(block, index, renderChildren(children, depth, isColumn)) : null}
    </>
  );
};

const renderWithHierarchy = (block: BlockChild, index: number, children: ReactNode) => {
  switch (block.type) {
    case "column_list":
      return <ColumnListBlock>{children}</ColumnListBlock>;
    case "column":
      return <ColumnBlock index={index}>{children}</ColumnBlock>;
    default:
      return <div className="pl-3 md:pl-6">{children}</div>;
  }
};

const renderChildren = (children: BlockChild[], depth: number, isChild: boolean) => {
  return children.map((child, index) => (
    <Block key={child.id} block={child} blocks={children} index={index} depth={depth + 1} isChild={isChild} />
  ));
};

const render = (block: BlockChild, blocks: BlockChild[], index: number, depth: number, isChild: boolean) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "heading_1":
      return <HeadingBlock block={block} />;
    case "heading_2":
      return <HeadingBlock block={block} />;
    case "heading_3":
      return <HeadingBlock block={block} />;
    case "code":
      return <CodeBlock block={block} />;
    case "quote":
      return <QuoteBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "bulleted_list_item":
      return <ListItemBlock block={block} depth={depth} />;
    case "numbered_list_item":
      return <ListItemBlock block={block} depth={depth} index={getNumberedListItemIndex(blocks, index)} />;
    case "divider":
      return <DividerBlock />;
    case "image":
      return <ImageBlock block={block} intrinsic={!isChild} />;
    default:
      return null;
  }
};

const getNumberedListItemIndex = (blocks: BlockChild[], index: number): number => {
  return takeRightWhile(blocks.slice(0, index + 1), (block) => block.type === "numbered_list_item").length - 1;
};
