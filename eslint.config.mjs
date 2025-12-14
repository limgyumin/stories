import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default defineConfig([
  ...nextVitals,
  pluginJs.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      unicorn,
    },
    rules: {
      "no-console": ["warn", { allow: ["error"] }],
      "no-unused-vars": [
        "warn",
        {
          caughtErrors: "none",
          varsIgnorePattern: "^_",
        },
      ],
      "no-undef": "error",
      "object-shorthand": "error",
      "require-await": "off",
      curly: ["error", "all"],

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            { pattern: "{next*,next*/**}", group: "builtin", position: "before" },
            { pattern: "{react*,react-*}", group: "builtin", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "import/first": "error",
      "import/extensions": "off",
      "import/no-named-as-default": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": "off",

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          leadingUnderscore: "allow",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: ["interface", "typeAlias", "class", "enum"],
          format: ["PascalCase"],
        },
      ],

      "react/prop-types": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",

      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {},
      },
    },
  },
  globalIgnores(["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
