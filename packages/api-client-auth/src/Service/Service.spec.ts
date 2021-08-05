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
    mockAPI.onPost('documents').reply(({ headers }) => {
      expect(headers.Authorization).toBeDefined();
      expect(headers.Date).toBeDefined();
      expect(headers['Content-Type']).toBeDefined();
      expect(headers['Content-MD5']).toBeDefined();
      expect(headers['MI-ERROR-FORMAT']).toBe('verbose');

      return [200, { original_hash: 'some-hash' }];
    });

    const doc = await Service.request<{ original_hash: string }>('documents', {
      method: 'POST',
    });

    expect(doc.original_hash).toBe('some-hash');
  });

  it('sets only one request interceptor', () => {
    service = Service.getInstance();
    // @ts-ignore
    expect(service.api.interceptors.request.handlers).toHaveLength(1);

    service = Service.getInstance();
    // @ts-ignore
    expect(service.api.interceptors.request.handlers).toHaveLength(1);
  });

  it('returns response error', async () => {
    const error = {
      status: 'error',
      errors: [
        {
          title: 'Aquí no hay un documento.',
          details:
            'No existe un documento que corresponda a este URL (la dirección web). Si copiaste y pegaste la dirección, es posible que hayas cometido un error. Asegúrate de que no sobren o falten caracteres e intenta nuevamente.',
          http_code: 'not_found',
          error_code: 'document_not_found',
        },
      ],
      failing_interactor: 'GetDocument',
      source: 'web',
    };

    mockAPI.onPost('documents').reply(() => [402, error]);

    try {
      await Service.request('documents', { method: 'POST' });
    } catch (err) {
      expect(err).toEqual(
        expect.objectContaining({
          ...error,
          status_code: 402,
          status_message: undefined,
        })
      );
    }
  });
});
