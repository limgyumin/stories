"use client";

import type { PropsWithChildren } from "react";
import { Children, createContext, useCallback, useRef, useState } from "react";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { cx } from "utils/cx";

type Props = PropsWithChildren;

type CarouselContextValue = {
  focusedIndex: number;
  focusTo?: (index: number) => Promise<void>;
};

export const CarouselContext = createContext<CarouselContextValue>({
  focusedIndex: 0,
});

export const Root = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // NOTE: Children.count 함수는 모든 하위 계층의 자식 개수를 반환하므로 Children.toArray 사용
  const count = Children.toArray(children).length;

  const { scrollXProgress } = useScroll({ container: ref });
  const currentFocusedIndex = useTransform(scrollXProgress, (input) => Math.round(input * (count - 1)));

  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useMotionValueEvent(currentFocusedIndex, "change", (latest) => setFocusedIndex(latest));

  const focusTo = useCallback(async (index: number) => {
    const container = ref.current;

    if (container === null) {
      return;
    }

    const to = (container.scrollWidth - container.clientWidth) * (index / (count - 1));

    container.scroll({ behavior: "smooth", left: to });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CarouselContext.Provider value={{ focusedIndex, focusTo }}>
      <div
        ref={ref}
        className={cx(
          "flex w-screen snap-x snap-mandatory gap-4 overflow-x-auto md:gap-9",
          "container-sm:ml-[calc(-50vw+var(--container-sm-inner)*.5)] container-sm:px-[calc(50vw-var(--container-sm-scroll)*.5)] ml-[calc(var(--container-inset)*-1)] mt-4 px-[calc(var(--container-inset)*2)] py-9 md:py-12",
        )}
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};
