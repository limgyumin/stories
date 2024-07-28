"use client";

import type { MouseEventHandler, ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { useDialogContext } from "./root.hooks";

type Props = ComponentPropsWithoutRef<"button">;

export const Trigger = forwardRef<HTMLButtonElement, Props>(({ children, onClick, ...rest }, ref) => {
  const { toggleState } = useDialogContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleState();
    onClick?.(e);
  };

  return (
    <button ref={ref} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
});
