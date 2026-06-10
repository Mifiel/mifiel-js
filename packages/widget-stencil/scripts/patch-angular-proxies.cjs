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

function dedupeOutputProperty(src, propertyName) {
  const pattern = new RegExp(
    `(@Output\\(\\) ${propertyName} = new EventEmitter<.+?>\\(\\);)(?:\\n\\s*\\1)+`,
    'g',
  );
  return src.replace(pattern, '$1');
}

const angularTarget = path.join(__dirname, '../../widget-angular/src/lib/stencil-generated/components.ts');
patchFile(angularTarget, src => {
  let next = dedupeOutputProperty(src, 'signError');
  next = dedupeOutputProperty(next, 'signSuccess');
  next = next.replace(
    /outputs: \['signError', 'sign-error', 'signSuccess', 'sign-success'\]/,
    "outputs: ['signError', 'signSuccess']",
  );
  next = next.replace(
    /signError: EventEmitter<.+?>;\n\n\s*'sign-error': EventEmitter<.+?>;\n\n\s*signSuccess: EventEmitter<.+?>;\n\n\s*'sign-success': EventEmitter<.+?>;/,
    match => {
      const eventType = match.match(/signError: EventEmitter<(.+)>;/)[1];
      return `signError: EventEmitter<${eventType}>;\n\n  signSuccess: EventEmitter<${eventType}>;`;
    },
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
