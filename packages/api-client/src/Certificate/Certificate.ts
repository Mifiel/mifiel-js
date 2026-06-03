import path from 'path';
import { openAsBlob } from 'node:fs';

import type { CertificateResponse } from '@mifiel/models';

import { Model } from '../Model';
import { multipartHeaders } from '../utils/multipartHeaders';
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
    const filename = path.basename(params.filepath);
    const file = await openAsBlob(params.filepath);

    form.append('cer_file', file, filename);

    return super.create(form, {
      headers: multipartHeaders(),
    });
  }
}

export const Certificate = new CertificateModel();
