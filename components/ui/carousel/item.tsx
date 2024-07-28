"use client";

import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

import { useCarouselContext } from "./root.hooks";

type Props = ComponentPropsWithoutRef<"div"> & {
  index: number;
};

export const Item = forwardRef<HTMLDivElement, Props>(({ children, className, index, onClick, ...rest }, ref) => {
  const { focusedIndex, focusTo } = useCarouselContext();

  const isFocused = index === focusedIndex;

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    focusTo(index);
    onClick?.(e);
  };

  return (
    <div
      ref={ref}
      className={cx(
        className,
        "min-w-container-sm-scroll snap-center transition-opacity duration-300",
        isFocused ? "opacity-100" : "cursor-pointer opacity-45",
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
});
