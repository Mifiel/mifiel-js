const {
  utils: { getPackages },
} = require('@commitlint/config-workspace-scopes').default;

module.exports = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-workspace-scopes',
  ],
  rules: {
    'scope-enum': async (ctx) => [
      2,
      'always',
      [
        ...(await getPackages(ctx)),
        // Insert custom scopes below:
        'release',
      ],
    ],
  },
};
