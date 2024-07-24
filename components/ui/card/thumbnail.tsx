import Image from "next/image";

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div"> & {
  src: string;
};

export const Thumbnail = forwardRef<HTMLDivElement, Props>(async ({ className, src, ...rest }, ref) => {
  return (
    <div ref={ref} className={cx(className, "relative w-full pt-[75%]")} {...rest}>
      <Image className="absolute top-0 w-full object-cover" src={src} alt={src} priority fill />
    </div>
  );
});
