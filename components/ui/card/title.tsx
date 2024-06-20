import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"h3">;

export const Title = forwardRef<HTMLHeadingElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <h3 ref={ref} className={cx(className, "text-sm font-medium text-white")} {...rest}>
      {children}
    </h3>
  );
});
