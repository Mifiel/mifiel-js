const globals = require('globals');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const tseslint = require('typescript-eslint');

const typeCheckedParserOptions = {
  projectService: true,
  tsconfigRootDir: __dirname,
};

const widgetReactRules = {
  '@typescript-eslint/no-unused-vars': 'off',
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
};

const sharedRules = {
  'no-console': 'warn',
  'import/prefer-default-export': 'off',
  'no-underscore-dangle': ['error', { allowAfterThis: true }],
  'prettier/prettier': 'error',
  'no-await-in-loop': 'off',
  'class-methods-use-this': 'off',
};

const sharedLanguageOptions = {
  ecmaVersion: 2021,
  sourceType: 'module',
  globals: {
    ...globals.browser,
    ...globals.node,
    ...globals.jest,
  },
};

module.exports = tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/*.config.js',
      'packages/widget-angular/src/lib/stencil-generated/**',
      'packages/widget-react/lib/components/stencil-generated/react-component-lib/**',
    ],
  },
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ...sharedLanguageOptions,
      parserOptions: typeCheckedParserOptions,
    },
    rules: {
      ...sharedRules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
    },
  },
  {
    files: [
      'packages/widget-react/**/*.{ts,tsx,js,jsx}',
      'packages/widget-vue/**/*.{ts,tsx,js,jsx}',
      'packages/widget-stencil/**/*.{ts,tsx,js,jsx}',
    ],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: widgetReactRules,
  },
  {
    files: ['packages/widget-angular/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-underscore-dangle': 'off',
    },
  },
);
