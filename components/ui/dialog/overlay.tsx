"use client";

import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

import { cx } from "utils/cx";

import { useDialogContext } from "./root.hooks";

type Props = ComponentPropsWithoutRef<"div">;

export const Overlay = forwardRef<HTMLDivElement, Props>(({ className, onClick, ...rest }, ref) => {
  const { state, toggleState } = useDialogContext();

  if (state === "init") {
    return null;
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    toggleState();
    onClick?.(e);
  };

  return createPortal(
    <div
      ref={ref}
      className={cx(
        className,
        "fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      )}
      data-state={state}
      onClick={handleClick}
      {...rest}
    />,
    document.body,
  );
});
