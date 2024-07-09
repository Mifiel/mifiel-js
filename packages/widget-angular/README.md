# Mifiel Widget Component

Angular component wrapper for Mifiel Widget implemented with StencilJS.

## Installation

Install the package using npm:

```bash
npm install @mifiel/widget-angular
```

## Usage

Import the MifielWidgetModule in your Angular module and use the mifiel-widget component in your Angular application:

## Importing the Module in app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MifielWidgetModule } from '@mifiel/widget-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MifielWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using the Component

Now, use the mifiel-widget component in your Angular component template:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Sign Document</h1>
      <mifiel-widget
        [id]="widgetId"
        [environment]="environment"
        (signSuccess)="onSuccessHandler()"
        (signError)="onErrorHandler($event)"
        [successBtnText]="successBtnText"
        [successBtnAction]="successBtnAction"
        [errorBtnAction]="errorBtnAction"
        [containerClass]="containerClass"
      ></mifiel-widget>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  widgetId = 'your-widget-id';
  environment = 'production';
  successBtnText = 'Proceed to next step';
  successBtnAction = 'https://example.com/next-step';
  errorBtnAction = 'https://example.com/error-page';
  containerClass = 'widget-container';

  onSuccessHandler() {
    console.log('Document signed successfully');
    // Your custom success handling logic here
  }

  onErrorHandler(error: any) {
    console.error('Signing error:', error);
    // Your custom error handling logic here
  }
}

```

## Props

- **`id`**: (string, required) The widget ID
- **`environment`**: (string, optional) The environment where the widget will be used: sandbox or production. By default, production.
- **`onSignSuccess`**: (function, optional) Function will be called when the document is signed successfully
- **`onSignError`**: (function, optional) Function that will be called whenever an error occurs during the signing flow.
- **`successBtnText`**: (string, optional) Text that will display in the main button in the success page. By default, Proceed to next step
- **`successBtnAction`**: (string | function, optional) Function to be executed when the main button is clicked in the success page. It can also be a string containing a URL to redirect to.
- **`errorBtnAction`**: (string | function, optional) Function to be executed when the main button is clicked in the error page. It can also be a string containing a URL to redirect to.
- **`containerClass`**: (string, optional) CSS class to be applied to the widget container.

## Listeners

In addition to using the `onSignSuccess` and `onSignError` props, listeners for `signSuccess` and `signError` events can also be added to achieve the same outcome. This approach is recommended for handling successful document signing and errors during the signing process.

# Important Information

## ESM Compatibility

This wrapper is built using ECMAScript Modules (ESM) and therefore only works in environments that support ESM. If you're using a build tool like Webpack or Rollup, they typically support ESM out of the box.

## tsconfig.json configuration

To prevent errors within the `node_modules` directory, set the `skipLibCheck` option to `true` in your TypeScript configuration file (`tsconfig.json`). This will skip type checking for all declaration files (`.d.ts`), improving the build time and reducing unnecessary errors from third-party libraries.
