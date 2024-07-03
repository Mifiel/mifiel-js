# Mifiel Widget Component

React component wrapper for Mifiel Widget implemented with StencilJS.

## Installation

Install the package using npm:

```bash
npm install @mifiel/widget-react
```

## Usage

Import the MifielWidget component and use it in your React application:

```jsx
import { useEffect, useRef } from 'react';
import { MifielWidget } from './components';

const YourComponent = () => {
  const widgetRef = useRef(null);

  const onSuccessHandler = () => {
    console.log('Document signed successfully');
    // Your custom success handling logic here
  };

  const onErrorHandler = (error) => {
    console.error('Signing error:', error);
    // Your custom error handling logic here
  };

  useEffect(() => {
    const widgetElement = widgetRef.current;

    if (widgetElement) {
      widgetElement.addEventListener('success', onSuccessHandler);
      widgetElement.addEventListener('error', onErrorHandler);
    }

    return () => {
      if (widgetElement) {
        widgetElement.removeEventListener('success', onSuccessHandler);
        widgetElement.removeEventListener('error', onErrorHandler);
      }
    };
  }, []);

  return (
    <MifielWidget
      ref={widgetRef}
      id="your-widget-id"
      environment="production"
      successBtnText="Proceed to next step"
      callToActionSuccess="https://example.com/next-step"
      containerClass="widget-container"
    />
  );
};

export default YourComponent;

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

## Listeners

In addition to using the `onSuccess` and `onError` props, listeners for `success` and `error` events can also be added to achieve the same outcome. This approach is recommended for handling successful document signing and errors during the signing process.

# Important Information

## ESM Compatibility

This wrapper is built using ECMAScript Modules (ESM) and therefore only works in environments that support ESM. If you're using a build tool like Webpack or Rollup, they typically support ESM out of the box.

## Using with Next.js

1. Next.js by default uses CommonJS modules. To use this wrapper with Next.js, you will need to enable ESM support. You can achieve this by using the next-transpile-modules plugin.

```bash
npm install next-transpile-modules
```

2. Create or update your next.config.js to include the plugin:

```javascript
const withTM = require('next-transpile-modules')(['@mifiel/widget-react']);

module.exports = withTM({
  // Other Next.js configurations
});
```

3. Import and use the wrapper in your Next.js application

If you are using another framework and encounter compatibility issues, look for the corresponding plugin.