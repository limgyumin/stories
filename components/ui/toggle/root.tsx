"use client";

import type { ComponentPropsWithoutRef } from "react";
import { createContext, forwardRef } from "react";

import { cx } from "utils/cx";

import type { ToggleContextValue } from "./root.types";

type Props = ComponentPropsWithoutRef<"div"> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

export const ToggleContext = createContext<ToggleContextValue>({
  currentValue: undefined,
  onValueChange: undefined,
});

export const Root = forwardRef<HTMLDivElement, Props>(({ children, className, value, onValueChange, ...rest }, ref) => {
  return (
    <ToggleContext.Provider
      value={{
        currentValue: value,
        onValueChange,
      }}
    >
      <div ref={ref} className={cx(className, "flex w-fit rounded-full border p-1")} {...rest}>
        {children}
      </div>
    </ToggleContext.Provider>
  );
});
