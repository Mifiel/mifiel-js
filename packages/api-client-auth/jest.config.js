const base = require('../../jest.config');
const packageJson = require('./package.json');

module.exports = {
  ...base,
  displayName: packageJson.name,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          // axios 1.20 publishes separate CJS (`index.d.cts`) and ESM
          // (`index.d.ts`) declarations. ts-jest resolves imports with an
          // implied module format, so this package and axios-mock-adapter
          // end up with two unrelated AxiosInstance types. Pin both to the
          // ESM declarations, which is what `tsc` already uses.
          baseUrl: '.',
          paths: {
            axios: ['../../node_modules/axios/index.d.ts'],
          },
        },
      },
    ],
  },
};
