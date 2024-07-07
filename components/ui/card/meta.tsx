import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"p">;

export const Meta = forwardRef<HTMLParagraphElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <p ref={ref} className={cx(className, "mt-1 text-xs font-light text-gray-300")} {...rest}>
      {children}
    </p>
  );
});
