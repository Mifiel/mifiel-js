import forge from 'node-forge';
import type { AxiosRequestConfig } from 'axios';
import { Config } from '../Config';

function getAuthorization(canonical: string[]) {
  const config = Config.getInstance();

  const hmac = forge.hmac.create();
  hmac.start('sha1', config.appSecret);
  hmac.update(canonical.join(','));
  const signatureBytes = hmac.digest().bytes();
  const encodedSignature = forge.util.encode64(signatureBytes);

  return `APIAuth ${config.appId}:${encodedSignature}`;
}

export const authenticationInterceptor = (config: AxiosRequestConfig) => {
  const date = new Date().toUTCString();
  const contentType = config.headers['content-type'] ?? 'application/json';

  const canonical = [
    config.method?.toUpperCase(),
    contentType,
    '',
    config.url,
    date,
  ];

  return Promise.resolve({
    ...config,
    headers: {
      ...config.headers,
      Authorization: getAuthorization(canonical),
      Date: date,
      'Content-Type': contentType,
      'Content-MD5': '',
    },
  });
};
