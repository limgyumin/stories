import type { PropsWithChildren } from "react";

import { Carousel } from "components/ui/carousel";

type Props = PropsWithChildren<{
  index: number;
}>;

export const ColumnBlock = ({ children, index }: Props) => {
  return <Carousel.Item index={index}>{children}</Carousel.Item>;
};
