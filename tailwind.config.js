// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "container-sm": "var(--container-sm)",
        "container-md": "var(--container-md)",
        "container-inset": "var(--container-inset)",
        "container-sm-inner": "var(--container-sm-inner)",
        "container-sm-scroll": "var(--container-sm-scroll)",
      },
      screens: {
        "container-sm": "672px",
        "container-md": "1024px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({ ...createEllipsisUtilities(3) });
    }),
  ],
};

const createEllipsisUtilities = (count) => {
  return objectFrom(
    (index) => [
      `.ellipsis-${index + 1}`,
      {
        overflow: "hidden",
        "text-overflow": "ellipsis",
        "word-break": "break-word",

        display: "-webkit-box",
        "-webkit-line-clamp": `${index + 1}`,
        "-webkit-box-orient": "vertical",
      },
    ],
    count,
  );
};

const objectFrom = (entry, count) => {
  const object = {};

  for (let i = 0; i < count; i++) {
    const [key, value] = entry(i);

    object[key] = value;
  }

  return object;
};
