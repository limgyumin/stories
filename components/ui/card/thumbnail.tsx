import Image from "next/image";

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import type { Dimensions } from "types/dimensions";
import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div"> & {
  src: string;
};

export const Thumbnail = forwardRef<HTMLDivElement, Props>(async ({ className, src, ...rest }, ref) => {
  const { width, height } = await getImageSize(src);

  return (
    <div ref={ref} className={cx(className, "w-full")} {...rest}>
      <Image className="w-full" src={src} alt={src} priority draggable={false} width={width} height={height} />
    </div>
  );
});

const getImageSize = async (url: string): Promise<Dimensions> => {
  // TODO: 환경별 host 분기 필요
  return fetch(`http://localhost:3000/api/image-dimensions?url=${encodeURIComponent(url)}`).then((res) => res.json());
};
