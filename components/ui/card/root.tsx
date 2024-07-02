import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"article">;

export const Root = forwardRef<HTMLElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <article ref={ref} className={cx(className, "relative overflow-hidden rounded-lg")} {...rest}>
      {children}
    </article>
  );
});
