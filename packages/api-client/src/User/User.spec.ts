import { Service } from '@mifiel/api-client-auth';

import { User } from './User';

describe('User', () => {
  let requestMock: jest.Mock;

  beforeEach(() => {
    requestMock = jest.fn(() => ({}));
    jest
      .spyOn(Service.getInstance().api, 'request')
      .mockImplementation(requestMock);
  });

  describe('@me', () => {
    it('sends users/me as GET ', async () => {
      await User.me();

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'users/me',
        })
      );
    });
  });

  describe('@setupWidget', () => {
    it('sends users/setup-widget as POST with user setup data', async () => {
      const user = {
        email: 'edgar@mifiel.com',
        tax_id: 'ZAAE9306278TA',
      };

      await User.setupWidget(user);

      expect(requestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: 'users/setup-widget',
          data: user,
        })
      );
    });
  });
});
