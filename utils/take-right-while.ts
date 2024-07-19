type TakeRightWhile = {
  <T, S extends T>(array: T[], predicate: (value: T, index: number, array: T[]) => value is S): S[];
  <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[];
};

export const takeRightWhile: TakeRightWhile = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
): T[] => {
  let index = array.length;

  // eslint-disable-next-line no-empty
  while (--index < array.length && array[index] && predicate(array[index]!, index, array)) {}

  return array.slice(index + 1, array.length);
};
