"use client";

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import type { PanInfo } from "framer-motion";
import { motion } from "framer-motion";

import { useDimensions, useRotate } from "./rotator.hooks";

type Props = ComponentPropsWithoutRef<"div">;

export const Rotator = forwardRef<HTMLDivElement, Props>(({ children, style, ...rest }, ref) => {
  const [motionRef, getDimensions] = useDimensions<HTMLDivElement>();
  const [rotate, setRotate, clearRotate] = useRotate(getDimensions);

  const handleDrag = (_: MouseEvent, info: PanInfo) => {
    const { x, y } = info.offset;

    setRotate({ x: y, y: x });
  };

  return (
    <div ref={ref} {...rest} style={{ ...style, perspective: 400 }}>
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
    </div>
  );
});
