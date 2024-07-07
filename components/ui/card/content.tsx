import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div">;

export const Content = forwardRef<HTMLDivElement, Props>(({ children, className, ...rest }, ref) => {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-full bg-gradient-to-b from-[rgba(0,0,0,0)_40%] via-[rgba(0,0,0,0.05)_48%] to-[rgba(0,0,0,0.55)_91%]" />

      <div
        ref={ref}
        className={cx(className, "absolute bottom-0 left-0 right-0 z-[1] flex flex-col gap-1 px-4 pb-4")}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});
