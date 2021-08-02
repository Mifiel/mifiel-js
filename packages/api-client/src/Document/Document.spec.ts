import 'isomorphic-form-data';
import path from 'path';
import fs from 'fs';
import { Service } from '@mifiel/api-client-auth';
import type { SignatoryResponse } from '@mifiel/models';

import { PassThrough } from 'stream';

import { Document } from './Document';

const filepath = path.join(__dirname, '../__fixtures__/test-paged.pdf');
const file = fs.readFileSync(filepath);

describe('Document', () => {
  const documentId = 'some-doc-id';
  let requestMock: jest.Mock;

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  describe('@transfer', () => {
    it('sends receiver and signatories as data', async () => {
      const receiver = {
        email: 'ram@mifiel.com',
      };

      const signatories: SignatoryResponse[] = [
        {
          email: 'ezavile@gmail.com',
          name: 'Edgar Zavala',
        },
        {
          email: 'edgar@mifiel.com',
          name: 'Edgar Z',
          tax_id: 'ZAAE9306278TA',
        },
      ];

      await Document.transfer({ documentId, receiver, signatories });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: `documents/${documentId}/transfer`,
          data: { receiver, signatories },
        })
      );
    });
  });

  describe('@hash', () => {
    const originalHash = `3a8591a1fe2b38f1eafdb34b27461c6d75a6a28bc3c80d659dd8c91dae07b845`;

    it('returns hash from buffer', async () => {
      const hash = await Document.getHash(file);
      expect(hash).toEqual(originalHash);
    });

    it('returns hash from Uint8Array', async () => {
      const hash = await Document.getHash(new Uint8Array(file.buffer));
      expect(hash).toEqual(originalHash);
    });
  });

  describe('@getFile', () => {
    it('sends documentId and type of file', async () => {
      await Document.getFile({ documentId, type: 'file_signed' });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: `documents/${documentId}/file_signed`,
        })
      );
    });
  });

  describe('@saveFile', () => {
    let mockWriter: PassThrough;

    beforeEach(() => {
      jest
        .spyOn(Document, 'getFile')
        .mockImplementation(() => Promise.resolve(file));

      mockWriter = new PassThrough();
      mockWriter.write = jest.fn();

      jest
        .spyOn(fs, 'createWriteStream')
        .mockReturnValueOnce(mockWriter as any);
    });

    it('writes file signed to filesystem', async () => {
      await Document.saveFile({
        documentId,
        type: 'file_signed',
        path: 'file_signed.pdf',
      });

      expect(fs.createWriteStream).toHaveBeenCalledWith('file_signed.pdf', {
        encoding: 'utf8',
      });

      expect(mockWriter.write).toHaveBeenCalledWith(file);
    });
  });

  describe('@create', () => {
    it('sends data as an JSON', async () => {
      await Document.create({ original_hash: 'some-file' });

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: `documents`,
          data: {
            original_hash: 'some-file',
          },
        })
      );
    });

    it('sends data as FormData', async () => {
      await Document.create({
        file: filepath,
        original_hash: 'some-file',
      });

      expect(requestMock.mock.calls[0][0].headers['content-type']).toContain(
        'multipart/form-data'
      );
    });
  });
});
