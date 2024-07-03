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
    call-to-action-success="https://example.com/next-step"
    call-to-action-error="https://example.com/error-page"
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
      widget.addEventListener('success', onSuccessHandler);
      widget.addEventListener('error', onErrorHandler);
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
  widget.setAttribute('call-to-action-success', 'https://example.com/next-step');
  widget.setAttribute('call-to-action-error', 'https://example.com/error-page');
  widget.setAttribute('container-class', 'widget-container');

  widget.addEventListener('success', onSuccessHandler);
  widget.addEventListener('error', onErrorHandler);

  document.body.appendChild(widget);
});

```

## Props

- **`id`**: (string, required) The ID of the widget.
- **`environment`**: (string, optional) The environment to use for the widget (`production` by default).
- **`on-success`**: (function, optional) Function to be called when the document is signed successfully.
- **`on-error`**: (function, optional) Listener for errors that occur during the signing flow.
- **`success-btn-text`**: (string, optional) Text for the success button (`Proceed to next step` by default).
- **`call-to-action-success`**: (string | function, optional) Main button action in the success view.
- **`call-to-action-error`**: (string | function, optional) Main button action in the error view.
- **`container-class`**: (string, optional) CSS class to be applied to the widget container.

## Listeners

In addition to using the `on-success` and `on-error` props, listeners for `success` and `error` events can also be added to achieve the same outcome. This approach is recommended for handling successful document signing and errors during the signing process.
