import type { Obj } from "types/utils/obj";

export const isObject = <T extends Obj>(arg: unknown): arg is T => {
  return typeof arg === "object" && arg !== null && !Array.isArray(arg);
};
