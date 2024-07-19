const entries = [
  [1000, "m"],
  [900, "cm"],
  [500, "d"],
  [400, "cd"],
  [100, "c"],
  [90, "xc"],
  [50, "l"],
  [40, "xl"],
  [10, "x"],
  [9, "ix"],
  [5, "v"],
  [4, "iv"],
  [1, "i"],
] as const;

export const romanize = (num: number): string => {
  let numeral = "";

  for (const [value, symbol] of entries) {
    while (num >= value) {
      numeral += symbol;
      num -= value;
    }
  }

  return numeral;
};
