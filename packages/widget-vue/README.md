# Mifiel Widget Component

Vue component wrapper for Mifiel Widget implemented with StencilJS.

## Installation

Install the package using npm:

```bash
npm install @mifiel/widget-vue
```

## Usage

Import the MifielWidget component and use it in your Vue application:

## Register plugin

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { MifielWidgetPlugin } from '@mifiel/widget-vue';

const app = createApp(App);
app.use(MifielWidgetPlugin);
app.mount('#app');
```

##  Usage
```javascript
<template>
  <div>
    <h1>Sign Document</h1>
    <MifielWidget
      id="your-widget-id"
      environment="production"
      {/* Event listeners for success and error events */}
      @sign-success="onSuccessHandler"
      @sign-error="onErrorHandler"
      success-btn-text="Proceed to next step"
      success-btn-action="https://example.com/next-step"
      error-btn-action="https://example.com/error-page"
      container-class="widget-container"
    />
  </div>
</template>

<script>
import { MifielWidget } from '@mifiel/widget-vue';

export default {
  components: {
    MifielWidget
  },
  methods: {
    onSuccessHandler() {
      console.log('Document signed successfully');
      // Your custom success handling logic here
    },
    onErrorHandler(error) {
      console.error('Signing error:', error);
      // Your custom error handling logic here
    }
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
```

## Props

- **`id`**: (string, required) The widget ID
- **`environment`**: (string, optional) The environment where the widget will be used: sandbox or production. By default, production.
- **`on-sign-success`**: (function, optional) Function will be called when the document is signed successfully
- **`on-sign-error`**: (function, optional) Function that will be called whenever an error occurs during the signing flow.
- **`success-btn-text`**: (string, optional) Text that will display in the main button in the success page. By default, Proceed to next step
- **`success-btn-action`**: (string | function, optional) Function to be executed when the main button is clicked in the success page. It can also be a string containing a URL to redirect to.
- **`error-btn-action`**: (string | function, optional) Function to be executed when the main button is clicked in the error page. It can also be a string containing a URL to redirect to.
- **`container-class`**: (string, optional) CSS class to be applied to the widget container.

## Listeners

In addition to using the `on-sign-success` and `on-sign-error` props, listeners for `sign-success` and `sign-error` events can also be added to achieve the same outcome. This approach is recommended for handling successful document signing and errors during the signing process.


# Important Information

## ESM Compatibility

This wrapper is built using ECMAScript Modules (ESM) and therefore only works in environments that support ESM. If you're using a build tool like Webpack or Rollup, they typically support ESM out of the box.