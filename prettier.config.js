/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;