module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', '@angular-eslint'],
  rules: {},
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
      parserOptions: {
        project: './tsconfig.json',
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
  ],
};
