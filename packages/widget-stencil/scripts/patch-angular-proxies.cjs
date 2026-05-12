/**
 * @stencil/angular-output-target can emit duplicate @Output() lines for the same
 * event (camelCase + kebab-case). Remove consecutive duplicates so ng build passes.
 */
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '../../widget-angular/src/lib/stencil-generated/components.ts');
let src = fs.readFileSync(target, 'utf8');
const before = src;
src = src.replace(
  /@Output\(\) signError = new EventEmitter<CustomEvent<any>>\(\);\n\s*@Output\(\) signError = new EventEmitter<CustomEvent<any>>\(\);/,
  '@Output() signError = new EventEmitter<CustomEvent<any>>();'
);
src = src.replace(
  /@Output\(\) signSuccess = new EventEmitter<CustomEvent<any>>\(\);\n\s*@Output\(\) signSuccess = new EventEmitter<CustomEvent<any>>\(\);/,
  '@Output() signSuccess = new EventEmitter<CustomEvent<any>>();'
);
if (src !== before) {
  fs.writeFileSync(target, src, 'utf8');
}
