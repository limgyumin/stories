import { useCallback, useEffect, useRef, type RefObject } from "react";

type ScrollCallbackArgs = {
  scrollXProgress: number;
};

// eslint-disable-next-line no-undef
type ScrollCallback = (args: ScrollCallbackArgs) => void;

export const useScroll = (ref: RefObject<HTMLElement | null | undefined>, callback: ScrollCallback) => {
  const callbackRef = useRef<ScrollCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const handleScroll = useCallback(() => {
    const container = ref.current;

    if (!container) {
      return;
    }

    callbackRef.current({ scrollXProgress: getScrollXProgress(container) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = ref?.current;

    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScroll]);
};

const getScrollXProgress = (element: HTMLElement): number => {
  const { scrollLeft, scrollWidth, clientWidth } = element;

  return scrollLeft / (scrollWidth - clientWidth);
};
