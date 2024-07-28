"use client";

import type { PropsWithChildren } from "react";
import { createContext, useCallback, useState } from "react";

import { noop } from "utils/noop";

type Props = PropsWithChildren;

type DialogState = "open" | "closed" | "init";

type DialogContextValue = {
  state: DialogState;
  toggleState: () => void;
};

export const DialogContext = createContext<DialogContextValue>({
  state: "init",
  toggleState: noop,
});

export const Root = ({ children }: Props) => {
  const [state, setState] = useState<DialogState>("init");

  const toggleState = useCallback(() => {
    if (state === "init") {
      setState("open");
    }

    if (state === "open") {
      setState("closed");
      setTimeout(() => setState("init"), 125);
    }
  }, [state]);

  return (
    <DialogContext.Provider
      value={{
        state,
        toggleState,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
