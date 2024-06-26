# Mifiel Widget Component

Web component for Mifiel Widget implemented with StencilJS.

## Installation

Install the package using npm:

```bash
npm install @mifiel/widget-stencil
```

## Usage

Use mifiel-widget component in your web application

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mifiel Widget Example</title>
  <script type="module">
    import { defineCustomElements } from '@mifiel/widget-stencil/loader';
    defineCustomElements();
  </script>
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
import { defineCustomElements } from '@mifiel/widget-stencil/loader';

defineCustomElements(window);

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
- **`onSuccess`**: (function, optional) Function to be called when the document is signed successfully.
- **`onError`**: (function, optional) Listener for errors that occur during the signing flow.
- **`successBtnText`**: (string, optional) Text for the success button (`Proceed to next step` by default).
- **`callToActionSuccess`**: (string | function, optional) Main button action in the success view.
- **`callToActionError`**: (string | function, optional) Main button action in the error view.
- **`containerClass`**: (string, optional) CSS class to be applied to the widget container.
