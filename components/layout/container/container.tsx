import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type ContainerSize = "sm" | "md";

type Props = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

export const Container = forwardRef<HTMLDivElement, Props>(({ children, className, size = "md", ...rest }, ref) => {
  return (
    <div
      ref={ref}
      data-size={size}
      className={cx(
        className,
        "mx-auto w-full px-container-inset data-[size=md]:max-w-container-md data-[size=sm]:max-w-container-sm",
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
