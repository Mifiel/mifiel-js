# Mifiel Widget Component

React component wrapper for Mifiel Widget implemented with StencilJS.

## Installation

Install the package using npm:

```bash
npm install @mifiel/widget-angular
```

## Usage

Import the MifielWidgetModule in your Angular module and use the mifiel-widget component in your Angular application:

## Importing the Module

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
        (onSuccess)="onSuccessHandler()"
        (onError)="onErrorHandler($event)"
        [successBtnText]="successBtnText"
        [callToActionSuccess]="callToActionSuccess"
        [callToActionError]="callToActionError"
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
  callToActionSuccess = 'https://example.com/next-step';
  callToActionError = 'https://example.com/error-page';
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

- **`id`**: (string, required) The ID of the widget.
- **`environment`**: (string, optional) The environment to use for the widget (`production` by default).
- **`onSuccess`**: (function, optional) Function to be called when the document is signed successfully.
- **`onError`**: (function, optional) Listener for errors that occur during the signing flow.
- **`successBtnText`**: (string, optional) Text for the success button (`Proceed to next step` by default).
- **`callToActionSuccess`**: (string | function, optional) Main button action in the success view.
- **`callToActionError`**: (string | function, optional) Main button action in the error view.
- **`containerClass`**: (string, optional) CSS class to be applied to the widget container.
