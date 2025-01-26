import type { Obj } from "types/utils/obj";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type HttpDetails = Omit<RequestInit, "method" | "body">;

export type HttpPreparer = (details: Readonly<HttpDetails>) => HttpDetails;

export type HttpValidator = (response: unknown) => string[];

export type HttpSelector<R, D = R> = (response: Readonly<R>) => D;

export type HttpOptions<R, Q extends Obj = Obj, B extends Obj = Obj, D = R> = {
  /**
   * @default "GET"
   */
  method?: HttpMethod;
  url: string;
  query?: Q;
  body?: B;
  details?: HttpDetails;
  preparers?: HttpPreparer[];
  validator?: HttpValidator;
  selector?: HttpSelector<R, D>;
};
