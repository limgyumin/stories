import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

type UseInViewOptions = {
  offset?: number;
  delta?: number;
};

type InViewCallback = (isInView: boolean) => void;

export const useInView = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  callback: InViewCallback,
  options?: UseInViewOptions,
) => {
  const prevIsInView = useRef<boolean>(false);

  const callbackRef = useRef<InViewCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const handleScroll = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    const { offset, delta } = options ?? {};

    const isInView = isOverHalfInView(ref.current, offset, delta);

    if (isInView !== prevIsInView.current) {
      callbackRef.current(isInView);
    }

    prevIsInView.current = isInView;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

const isOverHalfInView = <T extends HTMLElement>(element: T, offset = 0, delta = 0.5) => {
  const { offsetTop, offsetHeight } = element;

  const threshold = window.scrollY + (window.innerHeight - offset) * delta;

  const top = offsetTop - offset;
  const bottom = top + offsetHeight;

  return top <= threshold && threshold <= bottom;
};
