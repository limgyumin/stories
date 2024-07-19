export const capitalize = (str: string): string => {
  const head = str.slice(0, 1);
  const tail = str.slice(1);

  return `${head.toUpperCase()}${tail}`;
};
