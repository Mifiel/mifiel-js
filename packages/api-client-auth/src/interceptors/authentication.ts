import type { AxiosRequestConfig } from 'axios';
// @ts-ignore
import hmacsha1 from 'hmacsha1';

import { Config } from '../Config';

export const authenticationInterceptor = (axiosConfig: AxiosRequestConfig) => {
  const date = new Date().toUTCString();
  const contentType = axiosConfig.headers['content-type'] ?? 'application/json';

  const config = Config.getInstance();

  const canonical = [
    axiosConfig.method?.toUpperCase(),
    contentType,
    '',
    `/api/${config.version}/${axiosConfig.url}`,
    date,
  ];

  const signature = hmacsha1(config.appSecret, canonical.join(','));

  return Promise.resolve({
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `APIAuth ${config.appId}:${signature}`,
      Date: date,
      'Content-Type': contentType,
      'Content-MD5': '',
    },
  });
};
