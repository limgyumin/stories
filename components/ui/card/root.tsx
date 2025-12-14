import type { ComponentPropsWithRef, ElementType } from "react";

import type { ElementSelector } from "types/element-selector";
import type { Override } from "types/utils/override";
import { cx } from "utils/cx";

type Props<T extends ElementType> = Override<ComponentPropsWithRef<T>, ElementSelector<T>>;

export const Root = <T extends ElementType>({ ref, as, children, className, ...rest }: Props<T>) => {
  const Component = as ?? "div";

  return (
    <Component ref={ref} className={cx(className, "group relative block overflow-hidden rounded-lg")} {...rest}>
      {children}
    </Component>
  );
};
