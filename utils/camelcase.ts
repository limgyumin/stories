export const camelcase = (value: string): string => {
  let transformed = "";

  const words = value.split("_").entries();

  for (const [index, word] of words) {
    transformed += index === 0 ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  return transformed;
};
