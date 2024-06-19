import type { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'widget-stencil',
  outputTargets: [
    {
      type: 'dist',
    },
    // {
    //   type: 'dist-custom-elements',
    //   customElementsExportBehavior: 'auto-define-custom-elements',
    //   externalRuntime: false,
    // },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  sourceMap: false,
};
