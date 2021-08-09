import type { AxiosRequestConfig } from 'axios';
import Crypto from 'crypto';

import { Config } from '../../Config';

export const hmacAuthInterceptor = (axiosConfig: AxiosRequestConfig) => {
  const date = new Date().toUTCString();
  const contentType = axiosConfig.headers['content-type'] ?? 'application/json';

  const { version, hmacDigest, appSecret, appId } = Config;

  const canonical = [
    axiosConfig.method?.toUpperCase(),
    contentType,
    '',
    `/api/${version}/${axiosConfig.url}`,
    date,
  ];

  if (!appSecret) {
    throw new Error(`You must set tokens by Config.setTokens`);
  }

  const hmac = Crypto.createHmac(hmacDigest, appSecret);
  hmac.update(canonical.join(','));
  const signature = hmac.digest('base64');

  return Promise.resolve({
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `APIAuth-HMAC-${hmacDigest.toUpperCase()} ${appId}:${signature}`,
      Date: date,
      'Content-Type': contentType,
      'Content-MD5': '',
    },
  });
};
