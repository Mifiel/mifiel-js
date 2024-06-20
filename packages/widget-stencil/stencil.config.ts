import type { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

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
    angularOutputTarget({
      componentCorePackage: '@mifiel/widget-stencil',
      outputType: 'component',
      directivesProxyFile: '../angular-workspace/projects/widget-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/widget-angular/src/lib/stencil-generated/index.ts',
    }),
  ],
  sourceMap: false,
};
