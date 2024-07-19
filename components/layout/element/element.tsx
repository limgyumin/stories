import { forwardRef, type ComponentPropsWithoutRef, type ElementType, type Ref } from "react";

import type { ElementSelector } from "types/element-selector";

type Props<T extends ElementType> = ComponentPropsWithoutRef<T> & ElementSelector<T>;

const Element = <T extends ElementType>({ children, as, ...rest }: Props<T>, ref: Ref<any>) => {
  const Component = as ?? "div";

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
};

const Default = forwardRef(Element) as typeof Element;

export { Default as Element };
