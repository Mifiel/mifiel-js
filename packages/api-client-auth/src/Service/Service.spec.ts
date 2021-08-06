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

  describe('headers', () => {
    const expectHeaders = async (expectFn: (headers: any) => void) => {
      mockAPI.onPost('documents').reply(({ headers }) => {
        expectFn(headers);
        return [200];
      });

      await Service.request('documents', {
        method: 'POST',
      });
    };

    it('sends authorization headers', async () => {
      await expectHeaders((headers) => {
        expect(headers.Authorization).toBeDefined();
        expect(headers.Date).toBeDefined();
        expect(headers['Content-Type']).toBeDefined();
        expect(headers['Content-MD5']).toBeDefined();
      });
    });

    it('sends errma header', async () => {
      await expectHeaders((headers) => {
        expect(headers['MI-ERROR-FORMAT']).toBe('verbose');
      });
    });

    it('sends user-agent header', async () => {
      await expectHeaders((headers) => {
        const versions = headers['User-Agent'].split(' ');
        const [nodeVersion, vendorVersion, axiosVersion] = versions;

        expect(nodeVersion).toBe(`NODE/${process.versions.node}`);
        expect(vendorVersion).toBe(
          `@mifiel/api-client-auth/${process.env.npm_package_version}`
        );
        expect(axiosVersion).toBe(
          `axios/${process.env.npm_package_dependencies_axios}`
        );
      });
    });
  });

  describe('interceptors', () => {
    it('sets only one request interceptor', () => {
      service = Service.getInstance();
      // @ts-ignore
      expect(service.api.interceptors.request.handlers).toHaveLength(1);

      service = Service.getInstance();
      // @ts-ignore
      expect(service.api.interceptors.request.handlers).toHaveLength(1);
    });
  });

  describe('response', () => {
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

    it('returns data', async () => {
      mockAPI
        .onPost('documents')
        .reply(() => [200, { original_hash: 'some-hash' }]);

      const data = await Service.request<{ original_hash: string }>(
        'documents',
        {
          method: 'POST',
        }
      );

      expect(data.original_hash).toEqual('some-hash');
    });
  });
});
