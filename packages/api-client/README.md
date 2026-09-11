# `@mifiel/api-client`

JavaScript/TypeScript SDK for the [Mifiel](https://www.mifiel.com) API.

This package depends on [`@mifiel/api-client-auth`](https://github.com/Mifiel/mifiel-js/tree/main/packages/api-client-auth) for request authentication.

## Documentation

API reference, guides, and examples:

- English: https://docs.mifiel.com/en/
- Español: https://docs.mifiel.com/es/

This README covers installation and client setup only.

## Installation

```bash
npm install @mifiel/api-client-auth @mifiel/api-client --save
# or
pnpm add @mifiel/api-client-auth @mifiel/api-client
```

## Setup

```typescript
// ESM / TypeScript
import { Config } from '@mifiel/api-client-auth';
// CJS
const { Config } = require('@mifiel/api-client-auth');

Config.setTokens({
  appId: '<APP_ID>',
  appSecret: '<APP_SECRET>',
  // optional — defaults to production
  env: 'production', // or 'sandbox'
});
```

All methods return promises.

## Contributing

See the root [mifiel-js](https://github.com/Mifiel/mifiel-js) repository for monorepo development instructions.
