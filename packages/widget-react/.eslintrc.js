module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
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
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
