import NextImage from "next/image";

import type { ComponentPropsWithoutRef } from "react";

import type { Dimensions } from "types/dimensions";
import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div"> &
  Dimensions & {
    src: string;
    alt: string;
    intrinsic: boolean;
  };

export const Image = async ({ src, alt, intrinsic, className, style, width = 0, height = 0, ...rest }: Props) => {
  return (
    <div
      className={cx(className, "relative w-full")}
      style={{ ...style, aspectRatio: intrinsic ? `${width} / ${height}` : "3 / 4" }}
      {...rest}
    >
      {/* TODO: sizes prop */}
      <NextImage className="h-full w-full object-cover" src={src} alt={alt} fill />
    </div>
  );
};
