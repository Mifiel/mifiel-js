import { Service } from '@mifiel/api-client-auth';

import { Model } from './Model';

describe('Model', () => {
  const documentId = 'some-doc-id';
  let requestMock: jest.Mock;
  const model = new Model('documents');

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  it('@find - calls GET with id', async () => {
    await model.find(documentId);

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: `documents/${documentId}`,
      })
    );
  });

  it('@all - calls GET without id', async () => {
    await model.all();

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: `documents`,
      })
    );
  });

  it('@delete - calls DELETE', async () => {
    await model.delete(documentId);

    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
        url: `documents/${documentId}`,
      })
    );
  });

  it('@create - calls POST', async () => {
    await model.create({
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
    await model.update(documentId, {
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

  it('throws error if params are wrong', async () => {
    const wrongParams: any = [1, undefined, {}, null, true];

    for (let i = 0; i < wrongParams.length; i += 1) {
      await expect(model.find(wrongParams[i])).rejects.toThrowError();
      await expect(model.delete(wrongParams[i])).rejects.toThrowError();
      await expect(model.update(wrongParams[i], {})).rejects.toThrowError();
    }
  });
});
