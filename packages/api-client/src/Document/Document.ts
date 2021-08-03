import fs from 'fs';
import type FormData from 'isomorphic-form-data';
import { serialize } from 'object-to-formdata';
import { sha256 } from 'crypto-hash';
import type {
  DocumentRequest,
  DocumentResponse,
  SignatoryResponse,
} from '@mifiel/models';
import { Service } from '@mifiel/api-client-auth';

import { ModelCrud } from '../ModelCrud';
import {
  createDocumentSchema,
  GetFileSchema,
  getFileSchema,
  saveFileSchema,
  SaveFileSchema,
  transferDocumentSchema,
} from './document.types';

export abstract class Document extends ModelCrud {
  static resource = 'documents';

  static async getHash(file: string | Buffer | ArrayBuffer | ArrayBufferView) {
    const hash = await sha256(file);

    return hash;
  }

  static async getFile(params: GetFileSchema) {
    getFileSchema.parse(params);

    const { data: file } = await Service.request<Buffer>('documents', {
      method: 'GET',
      url: `${params.documentId}/${params.type}`,
    });

    return file;
  }

  static async saveFile(params: SaveFileSchema): Promise<void> {
    saveFileSchema.parse(params);

    const file = await this.getFile(params);

    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(params.path, {
        encoding: 'utf8',
      });

      writeStream.write(file);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (error) => reject(error));
      writeStream.end();
    });
  }

  static async create<Entity extends DocumentResponse>(doc: DocumentRequest) {
    createDocumentSchema.parse(doc);

    if (doc.file) {
      const form: Partial<FormData> = serialize(doc, {
        indices: true,
        nullsAsUndefineds: true,
      });

      (form as FormData).append('file', fs.createReadStream(doc.file));

      return super.create<Entity>(form, {
        headers: (form as FormData).getHeaders(),
      });
    }

    return super.create<Entity>(doc);
  }

  static async transfer(params: {
    documentId: string;
    callback_url?: string;
    receiver: {
      email: string;
      tax_id?: string;
      asset_key?: string;
    };
    signatories: SignatoryResponse[];
  }) {
    transferDocumentSchema.parse(params);

    const { documentId, ...restParams } = params;

    const { data } = await Service.request<DocumentResponse>(this.resource, {
      method: 'POST',
      url: `${documentId}/transfer`,
      data: restParams,
    });

    return data;
  }
}
