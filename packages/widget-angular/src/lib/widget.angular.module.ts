import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from '@mifiel/widget-stencil/dist/loader';
import { MifielWidget } from './widget-mifiel';

const DIRECTIVES = [MifielWidget];

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class MifielWidgetModule {}
