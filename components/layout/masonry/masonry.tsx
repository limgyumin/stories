import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Children, forwardRef, useMemo } from "react";

import { cx } from "utils/cx";

type Props = ComponentPropsWithoutRef<"div"> & {
  column: number;
  gap?: number;
};

export const Masonry = forwardRef<HTMLDivElement, Props>(({ children, className, column, gap, ...rest }, ref) => {
  const collection = Children.toArray(children).map(Children.toArray);

  const elements = useMemo(() => reorderElements(collection, column), [collection, column]);

  return (
    <div ref={ref} {...rest} className={cx(className, "flex w-full justify-between")} style={{ gap }}>
      {elements.map((element, index) => (
        <div key={index} className="flex flex-1 flex-col" style={{ gap }}>
          {element}
        </div>
      ))}
    </div>
  );
});

const reorderElements = (collection: ReactNode[][], column: number): ReactNode[][] => {
  return collection.reduce<ReactNode[][]>((acc, curr, index) => {
    const columnIndex = index % column;

    const copied = [...acc];
    const columnElement = [...(copied[columnIndex] ?? [])];

    if (columnElement.length > 0) {
      columnElement.push(curr);
      copied[columnIndex] = columnElement;
    } else {
      copied.push([curr]);
    }

    return copied;
  }, []);
};
