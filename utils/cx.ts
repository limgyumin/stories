import { isObject } from "./is-object";

export type ClassName = string | Record<string, boolean> | null | undefined;

// NOTE: 사용도가 잦으므로 속도를 위해 for 문을 사용합니다.
export const cx = (...classNames: ClassName[]): string => {
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

  return appended.trim();
};
