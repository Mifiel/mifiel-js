import MockAdapter from 'axios-mock-adapter';
import { Config } from '../Config';

import { Service } from './Service';

describe('Service', () => {
  let mifielService: Service;
  let mockAPI: MockAdapter;

  beforeAll(() => {
    Config.setTokens('app-id', 'app-ecret');

    mifielService = new Service();
    mockAPI = new MockAdapter(mifielService.service);
  });

  afterAll(() => {
    mockAPI.restore();
  });

  it('headers has been defined', async () => {
    mockAPI.onPost('api/v1/documents').reply(200);

    const {
      config: { headers },
    } = await mifielService.request({
      method: 'POST',
      url: 'api/v1/documents',
    });

    expect(headers.Authorization).toBeDefined();
    expect(headers.Date).toBeDefined();
    expect(headers['Content-Type']).toBeDefined();
    expect(headers['Content-MD5']).toBeDefined();
  });
});
