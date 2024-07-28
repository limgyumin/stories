import type { PropsWithChildren } from "react";

import { Carousel } from "../../../ui/carousel";

type Props = PropsWithChildren;

export const ColumnListBlock = ({ children }: Props) => {
  return <Carousel.Root>{children}</Carousel.Root>;
};
