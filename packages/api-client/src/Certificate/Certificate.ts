import fs from 'fs';
import FormData from 'isomorphic-form-data';

import type { CertificateResponse } from '@mifiel/models';

import { Model } from '../Model';
import {
  createCertificateSchema,
  CreateCertificateSchema,
} from './certificate.types';

class CertificateModel extends Model<CertificateResponse> {
  constructor() {
    super('keys');
  }

  async create(params: CreateCertificateSchema) {
    createCertificateSchema.parse(params);

    const form = new FormData();
    form.append('file', fs.createReadStream(params.filepath));

    return super.create(form, {
      headers: form.getHeaders(),
    });
  }
}

export const Certificate = new CertificateModel();
