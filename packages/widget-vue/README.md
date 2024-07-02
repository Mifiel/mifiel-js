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
      @success="onSuccessHandler"
      @error="onErrorHandler"
      success-btn-text="Proceed to next step"
      call-to-action-success="https://example.com/next-step"
      call-to-action-error="https://example.com/error-page"
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

- **`id`**: (string, required) The ID of the widget.
- **`environment`**: (string, optional) The environment to use for the widget (`production` by default).
- **`@success`**: (function, optional) Function to be called when the document is signed successfully.
- **`@error`**: (function, optional) Listener for errors that occur during the signing flow.
- **`success-btn-text`**: (string, optional) Text for the success button (`Proceed to next step` by default).
- **`call-to-action-success`**: (string | function, optional) Main button action in the success view.
- **`call-to-action-error`**: (string | function, optional) Main button action in the error view.
- **`container-class`**: (string, optional) CSS class to be applied to the widget container.

# Important Information

## ESM Compatibility

This wrapper is built using ECMAScript Modules (ESM) and therefore only works in environments that support ESM. If you're using a build tool like Webpack or Rollup, they typically support ESM out of the box.