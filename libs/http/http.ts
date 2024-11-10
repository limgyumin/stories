import type { Obj } from "types/utils/obj";
import { isDevelopment } from "utils/is-development";
import { querify } from "utils/querify";

import type { HttpOptions } from "./http.types";

const initialSelector = <R, D = R>(response: Readonly<R>) => response as unknown as D;

export const http = async <R, Q extends Obj = Obj, B extends Obj = Obj, D = R>(
  options: HttpOptions<R, Q, B, D>,
): Promise<Readonly<D>> => {
  const { method = "GET", url, query = {}, body = {}, preparers = [], validator, selector = initialSelector } = options;

  const details = preparers.reduce((prev, preparer) => preparer(prev), options.details ?? {});

  const input = `${url}${querify(query)}`;

  const result = await fetch(input, {
    method,
    body: JSON.stringify(body),
    ...details,
  });

  if (!result.ok) {
    throw new Error(`HTTP - Error Responded: ${result.status} ${input}`);
  }

  const response = (await result.json()) as R;

  if (isDevelopment()) {
    const validations = validator?.(response) ?? [];

    if (validations.length > 0) {
      throw new Error(`HTTP - Response type mismatch: ${validations.join("\n")}`);
    }
  }

  return selector(response);
};
