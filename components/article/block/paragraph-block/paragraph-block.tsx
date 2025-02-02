import { Highlight } from "components/article/highlight";
import type { BlockChild } from "libs/notion/notion.types";

import { RichText } from "../rich-text";

type Props = {
  block: BlockChild<"paragraph">;
};

export const ParagraphBlock = ({ block }: Props) => {
  if (block.paragraph.richText.length === 0) {
    return null;
  }

  return (
    <Highlight>
      <p className="mt-3 py-1 first:!mt-0 md:mt-4">
        <RichText richText={block.paragraph.richText} />
      </p>
    </Highlight>
  );
};
