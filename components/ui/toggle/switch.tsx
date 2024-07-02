"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";

import type { Override } from "types/utils/override";
import { cx } from "utils/cx";

import { useToggle } from "./root.hooks";

type BaseProps = {
  value: string;
};

type Props = Override<ComponentPropsWithoutRef<"button">, BaseProps>;

export const Switch = forwardRef<HTMLButtonElement, Props>(({ children, className, value, ...rest }, ref) => {
  const { currentValue, onValueChange } = useToggle();

  const active = currentValue === value;

  const handleClick = () => onValueChange?.(value);

  return (
    <button
      ref={ref}
      className={cx(
        className,
        { "bg-muted": active },
        "flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground",
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
});
