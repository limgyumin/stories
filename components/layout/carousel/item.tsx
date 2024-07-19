"use client";

import type { PropsWithChildren } from "react";

import { cx } from "utils/cx";

import { useCarouselContext } from "./root.hooks";

type Props = PropsWithChildren<{
  index: number;
}>;

export const Item = ({ children, index }: Props) => {
  const { focusedIndex, focusTo } = useCarouselContext();

  const isFocused = index === focusedIndex;

  const handleClick = () => focusTo?.(index);

  return (
    <div
      className={cx(
        "min-w-container-sm-scroll snap-center transition-opacity duration-300",
        isFocused ? "opacity-100" : "cursor-pointer opacity-45",
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
