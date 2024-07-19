import type { ElementType } from "react";

import { Element } from "components/layout/element";
import type { RichTextChild, RichTextChildren } from "libs/notion/notion.types";
import { cx } from "utils/cx";

type Props = {
  richText: RichTextChildren;
};

export const RichText = ({ richText }: Props) => {
  return (
    <>
      {richText.map((child, index) => (
        <Element
          key={index}
          as={getElementType(child)}
          className={cx(
            { "font-semibold": child.annotations.bold },
            { "line-through": child.annotations.strikethrough },
            { italic: child.annotations.italic },
            { "border-b border-solid border-current": child.annotations.underline },
            {
              "rounded-sm bg-gray-200 px-1 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-100":
                child.annotations.code,
            },
            { "border-b border-solid border-current text-gray-500": child.href != null },
          )}
          {...getAdditionalProps(child)}
        >
          {child.plainText}
        </Element>
      ))}
    </>
  );
};

const getElementType = (item: RichTextChild): ElementType => {
  if (item.href) {
    return "a";
  }

  if (item.annotations.code) {
    return "code";
  }

  return "span";
};

const getAdditionalProps = (item: RichTextChild) => {
  if (!item.href) {
    return;
  }

  return {
    title: item.href,
    href: item.href,
    target: "_blank",
  };
};
