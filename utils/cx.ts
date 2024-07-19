import { isObject } from "./is-object";

export type ClassName = string | Record<string, boolean> | null | undefined;

export const cx = (...classNames: ClassName[]): string | undefined => {
  let appended = "";

  for (const className of classNames) {
    if (isObject(className)) {
      for (const key in className) {
        if (className[key]) {
          appended += `${" "}${key}`;
        }
      }
    } else if (className) {
      appended += `${" "}${className}`;
    }
  }

  return appended.trim() || undefined;
};
