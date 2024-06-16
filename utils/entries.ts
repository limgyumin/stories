import type { Obj } from "types/utils/obj";

export const entries = <T extends Obj>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};
