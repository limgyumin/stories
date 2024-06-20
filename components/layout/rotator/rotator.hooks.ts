import type { MutableRefObject } from "react";
import { useRef } from "react";

import type { MotionValue } from "framer-motion";
import { transform, useMotionValue, useSpring } from "framer-motion";

type Dimensions = Readonly<{
  width: number;
  height: number;
}>;

type UseDimensionsReturn<T extends HTMLElement> = readonly [MutableRefObject<T | null>, () => Dimensions];

export const useDimensions = <T extends HTMLElement>(): UseDimensionsReturn<T> => {
  const ref = useRef<T | null>(null);

  const getDimensions = (): Dimensions => ({
    width: ref.current?.clientWidth ?? 0,
    height: ref.current?.clientHeight ?? 0,
  });

  return [ref, getDimensions];
};

type RotateCoordinates = Readonly<{
  x: number;
  y: number;
}>;

type RotateMotionValues = Readonly<Record<keyof RotateCoordinates, MotionValue<number>>>;

type UseRotateReturn = readonly [RotateMotionValues, (coordinates: RotateCoordinates) => void, () => void];

export const useRotate = (getDimensions: () => Dimensions): UseRotateReturn => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, {
    stiffness: 300,
    damping: 20,
  });

  const springRotateY = useSpring(rotateY, {
    stiffness: 300,
    damping: 20,
  });

  const set = ({ x, y }: RotateCoordinates) => {
    const { width, height } = getDimensions();

    rotateX.set(transform(x, [-height, height], [-20, 20]));
    rotateY.set(transform(y, [-width, width], [-20, 20]));
  };

  const clear = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const rotate: RotateMotionValues = {
    x: springRotateX,
    y: springRotateY,
  };

  return [rotate, set, clear];
};
