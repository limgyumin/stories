export const camelcase = (value: string): string => {
  const words = value.split("_").map((word, index) => {
    if (index === 0) {
      return word;
    }

    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  });

  return words.join("");
};
