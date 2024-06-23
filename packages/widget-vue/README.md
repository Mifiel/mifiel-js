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
      successBtnText="Proceed to next step"
      callToActionSuccess="https://example.com/next-step"
      callToActionError="https://example.com/error-page"
      containerClass="widget-container"
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
- **`successBtnText`**: (string, optional) Text for the success button (`Proceed to next step` by default).
- **`callToActionSuccess`**: (string | function, optional) Main button action in the success view.
- **`callToActionError`**: (string | function, optional) Main button action in the error view.
- **`containerClass`**: (string, optional) CSS class to be applied to the widget container.