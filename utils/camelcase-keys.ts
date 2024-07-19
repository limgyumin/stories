import type { CamelcaseKeys } from "types/utils/camelcase-keys";
import type { Obj } from "types/utils/obj";

import { camelcase } from "./camelcase";
import { isObject } from "./is-object";

export const camelcaseKeys = <T extends Obj>(obj: T): CamelcaseKeys<T> => {
  let transformed = {} as CamelcaseKeys<T>;

  for (const key in obj) {
    const value = obj[key];

    transformed = { ...transformed, [camelcase(key)]: transform(value) };
  }

  return transformed;
};

const transform = <T>(value: T) => {
  if (Array.isArray(value)) {
    const transformed: any[] = [];

    for (const element of value) {
      transformed.push(isObject(element) ? camelcaseKeys(element) : element);
    }

    return transformed;
  }

  return isObject(value) ? camelcaseKeys(value) : value;
};
