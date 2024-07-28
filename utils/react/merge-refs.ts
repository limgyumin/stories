import type { LegacyRef, MutableRefObject, RefCallback } from "react";

export const mergeRefs =
  <T>(...refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T> =>
  (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
  };
