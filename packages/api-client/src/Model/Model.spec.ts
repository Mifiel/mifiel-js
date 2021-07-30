import { Service } from '@mifiel/api-client-auth';
import type { DocumentRequest } from '@mifiel/models';

import { Model } from './Model';

describe('Model', () => {
  const documentId = 'some-doc-id';
  let requestMock: jest.Mock;

  beforeAll(() => {
    Model.resource = 'documents';
  });

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  it('@find - calls GET with id', async () => {
    await Model.find(documentId);

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: `documents/${documentId}`,
      })
    );
  });

  it('@all - calls GET without id', async () => {
    await Model.all();

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: `documents`,
      })
    );
  });

  it('@delete - calls DELETE', async () => {
    await Model.delete(documentId);

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
        url: `documents/${documentId}`,
      })
    );
  });

  it('@create - calls POST', async () => {
    await Model.create<DocumentRequest>({
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
    await Model.update<DocumentRequest>(documentId, {
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
