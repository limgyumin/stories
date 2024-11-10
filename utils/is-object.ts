import type { Obj } from "types/utils/obj";

export const isObject = (arg: unknown): arg is Obj => {
  return typeof arg === "object" && arg !== null && !Array.isArray(arg);
};
