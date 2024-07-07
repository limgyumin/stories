import type { ComponentPropsWithoutRef, ElementType, Ref } from "react";
import { forwardRef } from "react";

import type { ElementSelector } from "types/element-selector";
import { cx } from "utils/cx";

type Props<T extends ElementType> = ComponentPropsWithoutRef<T> & ElementSelector<T>;

const Root = <T extends ElementType>({ as, children, className, ...rest }: Props<T>, ref: Ref<any>) => {
  const Component = as ?? "div";

  return (
    <Component ref={ref} className={cx(className, "relative overflow-hidden rounded-lg")} {...rest}>
      {children}
    </Component>
  );
};

const Default = forwardRef(Root) as typeof Root;

export { Default as Root };
