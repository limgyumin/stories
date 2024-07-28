import NextImage from "next/image";

import type { ComponentPropsWithoutRef } from "react";

import type { Dimensions } from "types/dimensions";
import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div"> & {
  src: string;
  alt: string;
  intrinsic: boolean;
};

export const Image = async ({ src, alt, intrinsic, className, style, ...rest }: Props) => {
  let dimensions: Dimensions | undefined;

  if (intrinsic) {
    dimensions = await getImageDimensions(src);
  }

  const { width = 0, height = 0 } = dimensions ?? {};

  return (
    <div
      className={cx(className, "relative w-full")}
      style={{ ...style, aspectRatio: intrinsic ? `${width} / ${height}` : "3 / 4" }}
      {...rest}
    >
      <NextImage className="h-full w-full object-cover" src={src} alt={alt} fill />
    </div>
  );
};

const getImageDimensions = async (url: string): Promise<Dimensions | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/image-dimensions?url=${encodeURIComponent(url)}`,
  );

  if (response.status >= 400) {
    return;
  }

  return response.json();
};
