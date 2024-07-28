import { useContext } from "react";

import { CarouselContext } from "./root";

export const useCarouselContext = () => {
  return useContext(CarouselContext);
};
