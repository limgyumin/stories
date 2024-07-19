import type { BlockChild } from "libs/notion/notion.types";

import { RichText } from "../rich-text";

type Props = {
  block: BlockChild<"quote">;
};

export const QuoteBlock = ({ block }: Props) => {
  return (
    <blockquote className="mt-3 py-1 md:mt-4">
      <div className="border-l-2 border-muted-foreground py-0.5 pl-6 font-light italic dark:text-gray-300">
        <RichText richText={block.quote.richText} />
      </div>
    </blockquote>
  );
};
