# `@mifiel/api-client-auth`

> Library to authenticate Mifiel API calls. Mifiel uses **SHA1 HMAC** encryption.

Please read our [documentation](http://docs.mifiel.com/) for instructions on how to start using the API. This library depends on [axios](https://axios-http.com/) to make requests to the Mifiel API.

## Installation

```bash
npm install @mifiel/api-client-auth --save
# or
yarn add @mifiel/api-client-auth
```

## Usage

For your convenience Mifiel offers a Sandbox environment where you can confidently test your code. To start using the API in the Sandbox environment you need to first create an account at [sandbox.mifiel.com](https://sandbox.mifiel.com). Once you have an account you will need an **APP_ID** and an **APP_SECRET** which you can generate in [https://app-sandbox.mifiel.com/settings/access-tokens](https://https://app-sandbox.mifiel.com/settings/access-tokens).

## Setting Tokens

```typescript
// for ESM or TypeScript
import { Config } from '@mifiel/api-client-auth';
// for CJS
const { Config } = require('@mifiel/api-client-auth');

Config.setTokens({
  appId: '<APP_ID>',
  appSecret: '<APP_SECRET>',
  // [optional] - by default is production
  env: 'production' | 'sandbox' | 'staging'
});
```

Also, you can set the environment using the following methods:

```typescript
// for sandbox use
Config.useSandbox();

// for production use
Config.useProduction();
```

## Making a Request

Our `Service.request` method has 2 arguments: the first one is the resource name of the Mifiel API Rest and the second is the [axios request config](https://github.com/axios/axios#request-config). It will return a promise.

### Examples

```typescript
import { Service } from '@mifiel/api-client-auth';

// GET /documents
const docs = await Service.request('documents', {
  method: 'GET',
});

// GET /documents/document-id
const doc = await Service.request('documents', {
  method: 'GET',
  url: 'document-id',
});
```

Also, we have a library to wrap the most common methods [@mifiel/api-client](https://github.com/Mifiel/mifiel-js/tree/main/packages/api-client)
