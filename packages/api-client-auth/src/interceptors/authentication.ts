import type { AxiosRequestConfig } from 'axios';
// @ts-ignore
import hmacsha1 from 'hmacsha1';

import { Config } from '../Config';

export const authenticationInterceptor = (axiosConfig: AxiosRequestConfig) => {
  const date = new Date().toUTCString();
  const contentType = axiosConfig.headers['content-type'] ?? 'application/json';

  const canonical = [
    axiosConfig.method?.toUpperCase(),
    contentType,
    '',
    `/api/${Config.version}/${axiosConfig.url}`,
    date,
  ];

  if (!Config.appSecret) {
    throw new Error(`You must set tokens by Config.setTokens`);
  }

  const signature = hmacsha1(Config.appSecret, canonical.join(','));

  return Promise.resolve({
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `APIAuth ${Config.appId}:${signature}`,
      Date: date,
      'Content-Type': contentType,
      'Content-MD5': '',
    },
  });
};
