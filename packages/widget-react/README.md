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
import React, {useEffect} from 'react';
import { MifielWidget, defineCustomElements } from '@mifiel/widget-react';

function App() {
  useEffect(() => {
    defineCustomElements(window)
  },[]);

  const onSuccessHandler = () => {
    console.log('Document signed successfully');
    // Your custom success handling logic here
  };

  const onErrorHandler = (error) => {
    console.error('Signing error:', error);
    // Your custom error handling logic here
  };

  return (
    <div>
      <h1>Sign Document</h1>
      <MifielWidget
        id="your-widget-id"
        environment="production"
        onSuccess={onSuccessHandler}
        onError={onErrorHandler}
        successBtnText="Proceed to next step"
        callToActionSuccess="https://example.com/next-step"
        callToActionError="https://example.com/error-page"
        containerClass="widget-container"
      />
    </div>
  );
}

export default App;
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