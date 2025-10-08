"use client";

import type { ComponentPropsWithoutRef, FocusEventHandler, MouseEventHandler } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

import { useCarouselContext } from "./root.hooks";

type Props = ComponentPropsWithoutRef<"li"> & {
  index: number;
};

export const Item = forwardRef<HTMLLIElement, Props>(
  ({ children, className, index, onClick, onFocus, ...rest }, ref) => {
    const { focusedIndex, focusTo } = useCarouselContext();

    const isFocused = index === focusedIndex;

    const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
      focusTo(index);
      onClick?.(e);
    };

    const handleFocus: FocusEventHandler<HTMLLIElement> = (e) => {
      focusTo(index);
      onFocus?.(e);
    };

    return (
      <li
        ref={ref}
        className={cx(
          className,
          "min-w-container-sm-scroll snap-center outline-2 outline-offset-4 transition-opacity duration-300",
          isFocused ? "opacity-100" : "cursor-pointer opacity-45",
        )}
        tabIndex={0}
        onClick={handleClick}
        onFocus={handleFocus}
        {...rest}
      >
        {children}
      </li>
    );
  },
);
