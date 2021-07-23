import forge from 'node-forge';
import type { AxiosRequestConfig } from 'axios';
import { Config } from '../Config';

function getAuthorization(canonicalString: string[]) {
  const hmac = forge.hmac.create();
  hmac.start('sha1', Config.appSecret);
  hmac.update(canonicalString.join(','));
  const signatureBytes = hmac.digest().bytes();
  const encodedSignature = forge.util.encode64(signatureBytes);

  return `APIAuth ${Config.appID}:${encodedSignature}`;
}

export const authenticationInterceptor = (config: AxiosRequestConfig) => {
  const date = new Date().toUTCString();
  const contentType = config.headers['content-type'] ?? 'application/json';

  const canonicalString = [
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
      Authorization: getAuthorization(canonicalString),
      Date: date,
      'Content-Type': contentType,
      'Content-MD5': '',
    },
  });
};
