import fs from 'fs';
import FormData from 'isomorphic-form-data';

import type { CertificateResponse } from '@mifiel/models';

import { ModelCrud } from '../ModelCrud';

export abstract class Certificate extends ModelCrud {
  static resource = 'keys';

  static async create<Entity extends CertificateResponse>(params: {
    filepath: string;
  }) {
    const form = new FormData();
    form.append('file', fs.createReadStream(params.filepath));

    return super.create<Entity>(form, {
      headers: form.getHeaders(),
    });
  }
}
