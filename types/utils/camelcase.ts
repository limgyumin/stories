export type Camelcase<T extends string> = T extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${Camelcase<P3>}`
  : Lowercase<T>;
