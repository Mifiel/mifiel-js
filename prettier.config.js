module.exports = {
  trailingComma: "es5",
  semi: true,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  endOfLine: "lf",
  overrides: [
    {
      files: "*.{json}",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.{ts,tsx}",
      options: {
        parser: "typescript",
      },
    },
  ],
};
