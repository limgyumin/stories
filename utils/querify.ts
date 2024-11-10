import type { Obj } from "types/utils/obj";

export const querify = (obj: Obj): string => {
  let query = "";

  for (const key in obj) {
    const value = obj[key];

    if (value) {
      const separator = query.length === 0 ? "?" : "&";

      query = `${query}${separator}${key}=${encodeURIComponent(String(value))}`;
    }
  }

  return query;
};
