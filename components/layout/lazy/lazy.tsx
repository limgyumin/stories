"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useState } from "react";

import { useIsomorphicLayoutEffect } from "hooks/use-isomorphic-layout-effect";

type Props = PropsWithChildren<{
  fallback?: ReactNode;
}>;

export const Lazy = ({ children, fallback }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : fallback ?? null;
};
