"use client";

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

import { cx } from "utils/cx";

import { useDialogContext } from "./root.hooks";

type Props = ComponentPropsWithoutRef<"div">;

export const Content = forwardRef<HTMLDivElement, Props>(({ children, className, ...rest }, ref) => {
  const { state } = useDialogContext();

  if (state === "init") {
    return null;
  }

  return createPortal(
    <div
      ref={ref}
      className={cx(
        className,
        "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
        "w-full px-5 md:max-w-lg",
      )}
      data-state={state}
    >
      <div
        className={cx("grid w-full gap-4 overflow-hidden rounded-xl border bg-background shadow-lg md:rounded-2xl")}
        {...rest}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
});
