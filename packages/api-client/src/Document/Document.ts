import fs from 'fs';
import path from 'path';
import { createHash } from 'node:crypto';
import { openAsBlob } from 'node:fs';
import { serialize } from 'object-to-formdata';
import type {
  DocumentRequest,
  DocumentResponse,
  SignatoryResponse,
} from '@mifiel/models';

import { Model } from '../Model';
import { multipartHeaders } from '../utils/multipartHeaders';
import {
  createDocumentSchema,
  GetFileSchema,
  getFileSchema,
  saveFileSchema,
  SaveFileSchema,
  transferDocumentSchema,
} from './document.types';

class DocumentModel extends Model<DocumentResponse> {
  constructor() {
    super('documents');
  }

  async getHash(
    file: string | Buffer | ArrayBuffer | ArrayBufferView
  ): Promise<string> {
    let bytes: Uint8Array;

    if (typeof file === 'string') {
      bytes = new TextEncoder().encode(file);
    } else if (Buffer.isBuffer(file)) {
      bytes = new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
    } else if (ArrayBuffer.isView(file)) {
      bytes = new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
    } else {
      bytes = new Uint8Array(file);
    }

    // Preserve async API (formerly backed by crypto-hash); hash is computed synchronously.
    return await Promise.resolve(
      createHash('sha256').update(bytes).digest('hex')
    );
  }

  async getFile(params: GetFileSchema) {
    getFileSchema.parse(params);

    return this.request<Buffer>({
      method: 'GET',
      url: `${params.documentId}/${params.type}`,
      responseType: 'arraybuffer',
    });
  }

  async saveFile(params: SaveFileSchema): Promise<void> {
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

  async create(doc: DocumentRequest) {
    createDocumentSchema.parse(doc);

    if (doc.file) {
      const form = serialize(doc, {
        indices: true,
        nullsAsUndefineds: true,
      });

      const filename = path.basename(doc.file);
      const file = await openAsBlob(doc.file);

      form.append('file', file, filename);

      return super.create(form, {
        headers: multipartHeaders(),
      });
    }

    return super.create(doc);
  }

  async transfer(params: {
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

    return this.request<DocumentResponse>({
      method: 'POST',
      url: `${documentId}/transfer`,
      data: restParams,
    });
  }
}

export const Document = new DocumentModel();
