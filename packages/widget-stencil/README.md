# Mifiel Widget Component

Web component for Mifiel Widget implemented with StencilJS.

## Installation

Install the package using npm:

```bash
npm install @mifiel/widget
```

## Usage

### Using the `mifiel-widget` Component

To integrate the `mifiel-widget` component into your web application, follow these steps:

1. **Using Node Modules:**
   Compile the code and import our library using:
   ```javascript
   import { defineCustomElements } from '@mifiel/widget/loader';
   ```

2. **Using CDN:**
  Alternatively, you can include the component via CDN:
  ```javascript
  <script src="https://app.mifiel.com/widget/index.js"></script>
  ```
  This method allows you to directly use the component without compilation steps.


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mifiel Widget Example</title>
  <!-- with node modules -->
  <!-- <script type="module">
    import { defineCustomElements } from '@mifiel/widget/loader';
    defineCustomElements();
  </script> -->
  <!-- with CDN -->
  <script src="https://app.mifiel.com/widget/index.js"></script>
</head>
<body>
  <h1>Sign Document</h1>
  <mifiel-widget
    id="your-widget-id"
    environment="production"
    success-btn-text="Proceed to next step"
    success-btn-action="https://example.com/next-step"
    error-btn-action="https://example.com/error-page"
    container-class="widget-container"
  ></mifiel-widget>

  <script>
    function onSuccessHandler() {
      console.log('Document signed successfully');
      // Your custom success handling logic here
    }

    function onErrorHandler(error) {
      console.error('Signing error:', error);
      // Your custom error handling logic here
    }

    document.addEventListener('DOMContentLoaded', () => {
      const widget = document.querySelector('mifiel-widget');
      widget.addEventListener('signSuccess', onSuccessHandler);
      widget.addEventListener('signError', onErrorHandler);
    });
  </script>
</body>
</html>
```

## Using with JavaScript

```javascript
// Only use this if you are using node_modules.
// Start
import { defineCustomElements } from '@mifiel/widget/loader';

defineCustomElements(window);
// End

function onSuccessHandler() {
  console.log('Document signed successfully');
  // Your custom success handling logic here
}

function onErrorHandler(error) {
  console.error('Signing error:', error);
  // Your custom error handling logic here
}

document.addEventListener('DOMContentLoaded', () => {
  const widget = document.createElement('mifiel-widget');
  widget.setAttribute('id', 'your-widget-id');
  widget.setAttribute('environment', 'production');
  widget.setAttribute('success-btn-text', 'Proceed to next step');
  widget.setAttribute('success-btn-action', 'https://example.com/next-step');
  widget.setAttribute('error-btn-action', 'https://example.com/error-page');
  widget.setAttribute('container-class', 'widget-container');

  widget.addEventListener('signSuccess', onSuccessHandler);
  widget.addEventListener('signError', onErrorHandler);

  document.body.appendChild(widget);
});

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

In addition to using the `on-sign-success` and `on-sign-error` props, listeners for `signSuccess` and `signError` events can also be added to achieve the same outcome. This approach is recommended for handling successful document signing and errors during the signing process.
