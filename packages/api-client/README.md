# `@mifiel/api-client`

> Library to wrap the most common methods of Mifiel API.

This library depends on [@mifiel/api-client-auth](https://github.com/Mifiel/mifiel-js/tree/main/packages/api-client-auth) to authenticate the Mifiel API calls.

## Installation

```bash
npm install @mifiel/api-client-auth @mifiel/api-client --save
# or
yarn add @mifiel/api-client-auth @mifiel/api-client
```

## Usage

```typescript
// for ESM or TypeScript
import { Config } from '@mifiel/api-client-auth';
// for CJS
const { Config } = require('@mifiel/api-client-auth');

Config.setTokens({
  appId: '<APP_ID>',
  appSecret: '<APP_SECRET>',
  // [optional] - by default is production
  env: 'production' | 'sandbox' 
});
```

> All methods return promises

## Model Crud

We provide you a **Model** class to wrap **API CRUD** operations. You should create an instance sending the resource name.

```typescript
import { Model } from '@mifiel/api-client';

const documentModel = new Model('documents');

// GET /documents
const documents = await documentModel.all();
// GET /documents/document-id
const doc = await documentModel.find('document-id');
// POST /documents
await documentModel.create({ ...docAttributes });
// DELETE /documents/document-id
await documentModel.delete('document-id');
// PATCH /documents/document-id
await documentModel.update('document-id', { ...docAttributes });
```

## Document methods

```typescript
import { Document } from '@mifiel/api-client';
```

The `Document` is an instance from a extended class of `Model`, so it inherits the CRUD operations (`find`, `all`, `delete`, `create` and `update`).

### Document.getHash

Return the hex hash of a file.

```typescript
import { Document } from '@mifiel/api-client';
import path from 'path';
import fs from 'fs';

const filepath = path.join(__dirname, 'my-file.pdf');
const fileBuffer = fs.readFileSync(filepath);

const hexHash = await Document.getHash(fileBuffer);
```

### Document.getFile

Return the document related file.

```typescript
import { Document } from '@mifiel/api-client';

// original file of document-id
const file = await Document.getFile({ documentId: 'document-id', type: 'file' });
// signed file (original file + signature page) of document-id
const fileSigned = await Document.getFile({ documentId: 'document-id', type: 'file_signed' });
// signed xml file
const fileSigned = await Document.getFile({ documentId: 'document-id', type: 'xml' });
```

### Document.saveFile

Save Document related files.

```typescript
import { Document } from '@mifiel/api-client';

await Document.saveFile({
  documentId: 'document-id',
  type: 'file' | 'file_signed' | 'xml',
  path: 'path/to/save/my-file.pdf'
});
```

### Document.create

Use only `original_hash` if you don't want us to have the `file`. Either `file` or `original_hash` must be provided.

```typescript
import { Document } from '@mifiel/api-client';
import path from 'path';
import fs from 'fs';

const filepath = path.join(__dirname, 'you-file.pdf');
const fileBuffer = fs.readFileSync(filepath);

// sending file to Mifiel server
const newDocumentWithFile = await Document.create({
  file: filepath,
  signatories: [{
    name: 'Signer 1',
    email: 'signer1@email.com',
    tax_id: 'AAA010101AAA'
  }, {
    name: 'Signer 2',
    email: 'signer2@email.com',
    tax_id: 'AAA010102AAA'
  }],
  // ...
});

// sending only the hash of file
const hexHash = await Document.getHash(fileBuffer);
const newDocumentOnlyHash = await Document.create({
  original_hash: hexHash,
  name: 'my-file.pdf',
  signatories: [
    //...
  ],
  // ...
});
```

### Document.transfer

Use this method to transfer an endorsable document.

```typescript
import { Document } from '@mifiel/api-client';

const doc = await Document.transfer({
  documentId: 'document-id-to-transfer',
  receiver: {
    email: 'ezavile@mifiel.com',
    tax_id: 'ZAAE9306278TA',
  },
  signatories: [{
    name: 'Signer',
    email: 'signer@email.com',
    tax_id: 'AAA010102AAA',
    type: 'beneficiary',
  }]
})
```

## Certifcate methods

```typescript
import { Certificate } from '@mifiel/api-client';
```

The `Certificate` is an instance from a extended class of `Model`, so it inherits the CRUD operations (`find`, `all`, `delete`, `create` and `update`).

### Certificate.create

```typescript
import { Certificate } from '@mifiel/api-client';
import path from 'path';

const filepath = path.join(__dirname, 'you-cer.cer');

const newCertificate = await Certificate.create({ filepath });
```

## User methods

```typescript
import { User } from '@mifiel/api-client';
```

The `User` instance doesn't inherit from `Model`, so it doesn't have the CRUD operations.

### User.me

Return the user data.

```typescript
import { User } from '@mifiel/api-client';

const user = await User.me();
```

### User.setupWidget

Every user (issuer or receiver) of an endorsable document must set up his account. During this setup process, we will use the user's FIEL/e.firma to derive a set of cryptocurrency addresses where the assets (the endorsable documents) will be stored.

> Important: Save the widget_id in your database. If the user does not complete the setup, you should use the same widget_id when the user comes back to the setup flow.

```typescript
import { User } from '@mifiel/api-client';

const user = await User.setupWidget({
  email: 'edgar@mifiel.com',
  tax_id: 'ZAAE9306278TA',
});

// save it in your database
user.widget_id
```

## Template methods

```typescript
import { Template } from '@mifiel/api-client';
```

The `Template` is an instance from a extended class of `Model`, so it inherits the CRUD operations (`find`, `all`, `delete`, `create` and `update`).

Templates are a tool that allows you to create templates that have a base format. You can define fields within the html so you can then create a custumized document.

### Template.getFields

Get the fields of a specific template. Use it to know what to send to generate documents with this template.

```typescript
import { Template } from '@mifiel/api-client';

const fields = await Template.getFields({ templateId: 'template-id' });
```

### Template.getDocuments

Get all the active (non deleted) documents generated from a specific template.

```typescript
import { Template } from '@mifiel/api-client';

const documents = await Template.getDocuments({ templateId: 'template-id' });
```

### Template.generateDocument

Generate a document from a template.

```typescript
import { Template } from '@mifiel/api-client';

const documents = await Template.generateDocument({
  templateId: 'template-id',
  document: {
    name: 'Mi Client Name',
    signatories: [{
      name: 'Signer 1',
      email: 'signer1@email.com',
      tax_id: 'AAA010101AAA'
    }]
  }
});
```

### Template.generateDocuments

The generation of documents runs in the background. We will respond with 200 (OK) and start generating the documents. When our servers finish, we will POST you to the provided callback_url with a list of the created documents.

```typescript
import { Template } from '@mifiel/api-client';

const documents = await Template.generateDocuments({
  templateId: 'template-id',
  callback_url: 'https://www.my-site.com/webhook',
  documents: [{
    name: 'Mi Client Name',
    // ...
  }]
});
```

If you want to see more about the response attributes, please check out our library [@mifiel/models](https://github.com/Mifiel/mifiel-js/tree/main/packages/models/src)
