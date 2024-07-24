"use client";

import type { PropsWithChildren } from "react";
import { Children, createContext, useCallback, useRef, useState } from "react";

import { useScroll } from "hooks/use-scroll";
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
  const ref = useRef<HTMLDivElement | null>(null);

  // NOTE: Children.count 함수는 모든 하위 계층의 자식 개수를 반환하므로 Children.toArray 사용
  const count = Children.toArray(children).length;

  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useScroll(ref, ({ scrollXProgress }) => setFocusedIndex(Math.round(scrollXProgress * (count - 1))));

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
          "flex w-screen snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-hide md:gap-9",
          "ml-[calc(var(--container-inset)*-1)] mt-4 px-[calc(var(--container-inset)*2)] py-9 container-sm:ml-[calc(-50vw+var(--container-sm-inner)*.5)] container-sm:px-[calc(50vw-var(--container-sm-scroll)*.5)] md:py-12",
        )}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};
