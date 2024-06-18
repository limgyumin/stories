import type { Obj } from "types/utils/obj";
import type { CamelcaseKeys } from "types/utils/camelcase-keys";

import { entries } from "./entries";
import { camelcase } from "./camelcase";
import { isObject } from "./is-object";

export const camelcaseKeys = <T extends Obj>(obj: T): CamelcaseKeys<T> => {
  return entries(obj).reduce((acc, curr) => {
    const [key, value] = curr;

    const camelcaseKey = camelcase(String(key));

    acc = { ...acc, [camelcaseKey]: mapValue(value) };

    return acc;
  }, {} as CamelcaseKeys<T>);
};

const mapValue = <T>(value: T) => {
  if (Array.isArray(value)) {
    return value.map((x) => (isObject(x) ? camelcaseKeys(x) : x));
  }

  return isObject(value) ? camelcaseKeys(value) : value;
};
