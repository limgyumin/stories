import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div">;

export const Content = forwardRef<HTMLDivElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className={cx(className, "absolute bottom-0 left-0 right-0 z-[1] flex flex-col gap-1 p-[0px_16px_16px_16px]")}
        {...rest}
      >
        {children}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgba(0,0,0,0)_5%] to-[rgba(0,0,0,0.5)_80%]" />
    </>
  );
});
