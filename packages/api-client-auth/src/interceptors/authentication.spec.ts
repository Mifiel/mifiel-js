import MockDate from 'mockdate';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Config } from '../Config';

import { authenticationInterceptor } from './authentication';

describe('Authentication Interceptor', () => {
  let mifielAPI: AxiosInstance;
  let mockAPI: MockAdapter;

  beforeAll(() => {
    MockDate.set('2016');

    Config.setTokens({ appId: 'app-id', appSecret: 'app-secret' });
    const config = Config.getInstance();

    mifielAPI = axios.create({ baseURL: config.url });
    mifielAPI.interceptors.request.use(authenticationInterceptor);

    mockAPI = new MockAdapter(mifielAPI);
  });

  afterAll(() => {
    MockDate.reset();
    mockAPI.restore();
  });

  it('sets custom headers', async () => {
    mockAPI.onPost('/documents').reply(200);

    const {
      config: { headers },
    } = await mifielAPI.request({
      method: 'POST',
      url: 'documents',
    });

    expect(headers.Authorization).toBe(
      'APIAuth app-id:Qr94Z4Nvp0p5G1CsR5LpQDaTQXM='
    );
    expect(headers.Date).toBe(new Date().toUTCString());
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['Content-MD5']).toBe('');
  });
});
