import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div">;

export const Container = forwardRef<HTMLDivElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={cx(className, "mx-auto box-content max-w-5xl overflow-x-hidden px-5")} {...rest}>
      {children}
    </div>
  );
});
