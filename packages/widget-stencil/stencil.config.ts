import type { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'widget-stencil',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: '@mifiel/widget-stencil',
      proxiesFile: '../widget-react/lib/components/stencil-generated/index.ts',
    }),
  ],
  sourceMap: false,
};
