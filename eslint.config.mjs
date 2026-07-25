import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-constant-binary-expression": "error",
      "no-debugger": "error",
      "no-dupe-keys": "error",
      "no-unreachable": "error",
      "no-unused-private-class-members": "error",
    },
  },
  // TypeScript/TSX is checked by TypeScript 7 itself in the lint script.
  // eslint-config-next currently loads a parser that expects the TS <=6 API.
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "coverage/**",
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
  ]),
]);
