import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import type { BlockChild } from "libs/notion/notion.types";
import { capitalize } from "utils/capitalize";

import { CopyButton } from "./copy-button";
import { Caption } from "../caption";

type Props = {
  block: BlockChild<"code">;
};

export const CodeBlock = ({ block }: Props) => {
  const { language, richText, caption } = block.code;

  const plainText = richText[0]?.plainText ?? "";

  return (
    <div className="mt-4 flex flex-col gap-3 py-2 md:py-4">
      <div className="relative rounded-md bg-neutral-900 text-xs md:text-sm">
        <p className="absolute left-4 top-3 text-xs text-neutral-500">{capitalize(language)}</p>

        <div className="group relative">
          <div className="absolute right-2 top-2">
            <CopyButton text={plainText} />
          </div>

          <SyntaxHighlighter
            style={oneDark}
            showLineNumbers
            lineNumberStyle={{ fontSize: 11.5, minWidth: "2.25em" }}
            customStyle={{
              overflowX: "scroll",
              background: "transparent",
              margin: 0,
              fontSize: "inherit",
            }}
            codeTagProps={{ style: { background: "transparent" } }}
            language={language}
            className="!pb-6 !pl-3 !pr-4 !pt-9"
          >
            {plainText}
          </SyntaxHighlighter>
        </div>
      </div>

      <Caption caption={caption} />
    </div>
  );
};
