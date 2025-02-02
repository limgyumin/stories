"use client";

import type { PropsWithChildren } from "react";
import { useRef, useState } from "react";

import { useInView } from "hooks/use-in-view";

export const Highlight = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isInView, setIsInView] = useState<boolean>(false);

  useInView(ref, setIsInView, { delta: 0.3 });

  return (
    <div
      ref={ref}
      className="opacity-25 transition-all data-[highlight=true]:scale-[1.025] data-[highlight=true]:opacity-100"
      data-highlight={isInView}
    >
      {children}
    </div>
  );
};
