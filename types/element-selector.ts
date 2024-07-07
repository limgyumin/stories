import type { ElementType } from "react";

export type ElementSelector<T extends ElementType> = {
  as?: T;
};
