import 'isomorphic-form-data';
import path from 'path';
import { Service } from '@mifiel/api-client-auth';

import { Certificate } from './Certificate';

const filepath = path.join(__dirname, '../__fixtures__/ZAAE9306278TA.cer');

describe('Certificate', () => {
  let requestMock: jest.Mock;

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  describe('@create', () => {
    it('sends data as FormData', async () => {
      await Certificate.create({ filepath });

      expect(requestMock.mock.calls[0][0].headers['content-type']).toContain(
        'multipart/form-data'
      );
    });
  });
});
