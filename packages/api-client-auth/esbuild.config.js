const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/main.ts'],
  bundle: true,
  minify: true,
  format: 'esm',
  tsconfig: 'tsconfig.prod.json',
  platform: 'node',
  outfile: 'dist/esm/main.js',
});
