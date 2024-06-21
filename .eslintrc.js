module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'prettier/prettier': 'error',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/dot-notation': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'default-case': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'prefer-rest-params': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-prototype-builtins': 'off',
    'symbol-description': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
      parserOptions: {
        project: './tsconfig.json',
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
