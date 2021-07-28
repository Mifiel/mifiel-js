import { Config, Service } from '@mifiel/api-client-auth';
import type { SignatoryResponse } from '@mifiel/models';
import type { AxiosInstance } from 'axios';

import { Document } from './Document';

describe('Documents', () => {
  let api: AxiosInstance;
  const documentId = 'some-doc-id';

  beforeAll(() => {
    Config.setTokens({ appId: 'app-id', appSecret: 'app-secret' });
    api = Service.getInstance().api;
  });

  describe('@transfer', () => {
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

    beforeEach(() => {
      jest.spyOn(api, 'request').mockImplementation();
    });

    it('sends receiver and signatories as data', async () => {
      await Document.transfer({ documentId, receiver, signatories });

      expect(api.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: `documents/${documentId}/transfer`,
          data: { receiver, signatories },
        })
      );
    });
  });
});
