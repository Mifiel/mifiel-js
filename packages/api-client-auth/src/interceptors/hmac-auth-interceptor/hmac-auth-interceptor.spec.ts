import MockDate from 'mockdate';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Config } from '../../Config';

import { hmacAuthInterceptor } from './hmac-auth-interceptor';

describe('HMAC Authentication Interceptor', () => {
  let mifielAPI: AxiosInstance;
  let mockAPI: MockAdapter;
  const tokens = { appId: 'app-id', appSecret: 'app-secret' };

  beforeAll(() => {
    MockDate.set('2016');

    mifielAPI = axios.create({ baseURL: Config.url });
    mifielAPI.interceptors.request.use(hmacAuthInterceptor);

    mockAPI = new MockAdapter(mifielAPI);
  });

  afterAll(() => {
    MockDate.reset();
    mockAPI.restore();
  });

  const doEndpoint = async () => {
    mockAPI.onPost('/documents').reply(200);

    const {
      config: { headers },
    } = await mifielAPI.request({
      method: 'POST',
      url: 'documents',
    });

    return headers;
  };

  it('throws error if tokens were not setted', async () => {
    Config.setTokens({ appId: '', appSecret: '' });

    await expect(doEndpoint()).rejects.toThrowError();
  });

  it('sends custom headers', async () => {
    Config.setTokens({ ...tokens });
    const headers = await doEndpoint();

    expect(headers.Date).toBe(new Date().toUTCString());
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['Content-MD5']).toBe('');
  });

  it('sends signature using digest sha1', async () => {
    Config.setTokens({ ...tokens });
    const headers = await doEndpoint();

    expect(headers.Authorization).toBe(
      'APIAuth app-id:Qr94Z4Nvp0p5G1CsR5LpQDaTQXM='
    );
  });
});
