import { Service } from '@mifiel/api-client-auth';
import type { DocumentRequest } from '@mifiel/models';

import { ModelCrud } from './ModelCrud';

describe('ModelCrud', () => {
  const documentId = 'some-doc-id';
  let requestMock: jest.Mock;

  beforeAll(() => {
    ModelCrud.resource = 'documents';
  });

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  it('@find - calls GET with id', async () => {
    await ModelCrud.find(documentId);

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: `documents/${documentId}`,
      })
    );
  });

  it('@all - calls GET without id', async () => {
    await ModelCrud.all();

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: `documents`,
      })
    );
  });

  it('@delete - calls DELETE', async () => {
    await ModelCrud.delete(documentId);

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
        url: `documents/${documentId}`,
      })
    );
  });

  it('@create - calls POST', async () => {
    await ModelCrud.create<DocumentRequest>({
      original_hash: 'some-hash',
    });

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: `documents`,
        data: {
          original_hash: 'some-hash',
        },
      })
    );
  });

  it('@update - calls PATCH', async () => {
    await ModelCrud.update<DocumentRequest>(documentId, {
      original_hash: 'some-hash',
    });

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PATCH',
        url: `documents/${documentId}`,
        data: {
          original_hash: 'some-hash',
        },
      })
    );
  });
});
