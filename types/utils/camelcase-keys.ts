import type { Camelcase } from "./camelcase";
import type { Obj } from "./obj";

export type CamelcaseKeys<T> = {
  [K in keyof T as Camelcase<K & string>]: T[K] extends (infer U)[]
    ? U extends Obj
      ? CamelcaseKeys<U>[]
      : T[K]
    : T[K] extends Obj
      ? CamelcaseKeys<T[K]>
      : T[K];
};
