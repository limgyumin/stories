import { type ElementType, type ComponentPropsWithRef } from "react";

import type { ElementSelector } from "types/element-selector";
import type { Override } from "types/utils/override";

type Props<T extends ElementType> = Override<ComponentPropsWithRef<T>, ElementSelector<T>>;

export const Element = <T extends ElementType>({ ref, children, as, ...rest }: Props<T>) => {
  const Component = as ?? "div";

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
};
