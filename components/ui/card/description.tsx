import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"p">;

export const Description = forwardRef<HTMLParagraphElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <p ref={ref} className={cx(className, "text-xs font-extralight text-gray-200 ellipsis-2")} {...rest}>
      {children}
    </p>
  );
});
