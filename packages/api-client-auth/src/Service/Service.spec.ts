import MockAdapter from 'axios-mock-adapter';
import { Config } from '../Config';

import { Service } from './Service';

describe('Service', () => {
  let service: Service;
  let mockAPI: MockAdapter;

  beforeAll(() => {
    Config.setTokens({ appId: 'app-id', appSecret: 'app-secret' });
    service = Service.getInstance();

    mockAPI = new MockAdapter(service.api);
  });

  afterAll(() => {
    mockAPI.restore();
  });

  it('headers has been defined', async () => {
    mockAPI.onPost('documents').reply(200);

    const {
      config: { headers },
    } = await Service.request('documents', {
      method: 'POST',
    });

    expect(headers.Authorization).toBeDefined();
    expect(headers.Date).toBeDefined();
    expect(headers['Content-Type']).toBeDefined();
    expect(headers['Content-MD5']).toBeDefined();
  });

  it('sets only one request interceptor', () => {
    service = Service.getInstance();
    // @ts-ignore
    expect(service.api.interceptors.request.handlers).toHaveLength(1);

    service = Service.getInstance();
    // @ts-ignore
    expect(service.api.interceptors.request.handlers).toHaveLength(1);
  });
});
