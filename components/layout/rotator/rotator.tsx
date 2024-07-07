"use client";

import type { ComponentPropsWithoutRef, ElementType, Ref } from "react";
import { forwardRef } from "react";

import type { PanInfo } from "framer-motion";
import { motion } from "framer-motion";

import type { ElementSelector } from "types/element-selector";

import { useDimensions, useRotate } from "./rotator.hooks";

type Props<T extends ElementType> = ComponentPropsWithoutRef<T> & ElementSelector<T>;

const Rotator = <T extends ElementType>({ as, children, style, ...rest }: Props<T>, ref: Ref<any>) => {
  const [motionRef, getDimensions] = useDimensions<HTMLDivElement>();
  const [rotate, setRotate, clearRotate] = useRotate(getDimensions);

  const handleDrag = (_: MouseEvent, info: PanInfo) => {
    const { x, y } = info.offset;

    setRotate({ x: y, y: x });
  };

  const Component = as ?? "div";

  return (
    <Component ref={ref} {...rest} style={{ ...style, perspective: 400 }}>
      <motion.div
        ref={motionRef}
        style={{
          cursor: "grab",
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        drag
        dragElastic={0}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onDrag={handleDrag}
        onDragEnd={clearRotate}
        whileDrag={{ cursor: "grabbing", scale: 0.9 }}
      >
        {children}
      </motion.div>
    </Component>
  );
};

const Default = forwardRef(Rotator) as typeof Rotator;

export { Default as Rotator };
