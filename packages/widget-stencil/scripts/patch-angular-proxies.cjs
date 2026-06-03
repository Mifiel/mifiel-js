/**
 * Stencil output targets can emit duplicate event bindings (camelCase + kebab-case).
 * Normalize generated proxies so framework package builds pass.
 */
const fs = require('fs');
const path = require('path');

function patchFile(filePath, mutator) {
  if (!fs.existsSync(filePath)) {
    console.warn(`patch skipped, file not found: ${filePath}`);
    return;
  }
  const src = fs.readFileSync(filePath, 'utf8');
  const next = mutator(src);
  if (next !== src) {
    fs.writeFileSync(filePath, next, 'utf8');
  }
}

const angularTarget = path.join(__dirname, '../../widget-angular/src/lib/stencil-generated/components.ts');
patchFile(angularTarget, src => {
  let next = src.replace(
    /@Output\(\) signError = new EventEmitter<CustomEvent<any>>\(\);\n\s*@Output\(\) signError = new EventEmitter<CustomEvent<any>>\(\);/,
    '@Output() signError = new EventEmitter<CustomEvent<any>>();',
  );
  next = next.replace(
    /@Output\(\) signSuccess = new EventEmitter<CustomEvent<any>>\(\);\n\s*@Output\(\) signSuccess = new EventEmitter<CustomEvent<any>>\(\);/,
    '@Output() signSuccess = new EventEmitter<CustomEvent<any>>();',
  );
  return next;
});

const reactIndexTarget = path.join(__dirname, '../../widget-react/lib/components/stencil-generated/index.ts');
patchFile(reactIndexTarget, () => "export * from './components';\n");

const reactTarget = path.join(__dirname, '../../widget-react/lib/components/stencil-generated/components.ts');
patchFile(reactTarget, src => {
  return src
    .replace(
      /export type MifielWidgetEvents = \{\n\s*onSignError: EventName<MifielWidgetCustomEvent<any>>,\n\s*onSignError: EventName<MifielWidgetCustomEvent<any>>,\n\s*onSignSuccess: EventName<MifielWidgetCustomEvent<any>>,\n\s*onSignSuccess: EventName<MifielWidgetCustomEvent<any>>\n\};/,
      `export type MifielWidgetEvents = {
    onSignError: EventName<MifielWidgetCustomEvent<any>>,
    onSignSuccess: EventName<MifielWidgetCustomEvent<any>>
};`,
    )
    .replace(
      /events: \{\n\s*onSignError: 'signError',\n\s*onSignError: 'sign-error',\n\s*onSignSuccess: 'signSuccess',\n\s*onSignSuccess: 'sign-success'\n\s*\}/,
      `events: {
        onSignError: 'signError',
        onSignSuccess: 'signSuccess'
    }`,
    );
});
