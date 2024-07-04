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
    const widgetElement = widgetRef?.current;

    if (widgetElement) {
      widgetElement.addEventListener('signSuccess', onSuccessHandler);
      widgetElement.addEventListener('signError', onErrorHandler);
    }

    return () => {
      if (widgetElement) {
        widgetElement.removeEventListener('signSuccess', onSuccessHandler);
        widgetElement.removeEventListener('signError', onErrorHandler);
      }
    };
  }, [widgetRef.current]);

  return (
    <MifielWidget
      ref={widgetRef}
      id="your-widget-id"
      environment="production"
      successBtnText="Proceed to next step"
      successBtnAction="https://example.com/next-step"
      errorBtnAction="https://example.com/next-step"
      containerClass="widget-container"
    />
  );
};

export default YourComponent;

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