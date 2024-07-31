import { useCallback, useRef, useState } from "react";

type UseRollbackStateReturns<T> = [getter: T, setter: (nextState: T) => void];

export const useRollbackState = <T>(initialState: T, rollbackDelayMs: number): UseRollbackStateReturns<T> => {
  const [state, setState] = useState<T>(initialState);

  const prevState = useRef<T>(initialState);

  const set = useCallback(
    (nextState: T) => {
      prevState.current = state;

      setState(nextState);

      setTimeout(() => {
        setState(prevState.current);
      }, rollbackDelayMs);
    },
    [state, rollbackDelayMs],
  );

  return [state, set];
};
