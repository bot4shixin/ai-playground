/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "indent": ["error", 2],
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "off",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;