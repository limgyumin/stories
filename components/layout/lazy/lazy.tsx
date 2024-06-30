"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useEffect, useState } from "react";

type Props = PropsWithChildren<{
  fallback?: ReactNode;
}>;

export const Lazy = ({ children, fallback }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : fallback ?? null;
};
