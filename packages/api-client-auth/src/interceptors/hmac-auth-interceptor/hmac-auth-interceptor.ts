import { AxiosHeaders } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import Crypto from 'crypto';

import { Config } from '../../Config';

export const hmacAuthInterceptor = (
  axiosConfig: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const date = new Date().toUTCString();
  const merged = AxiosHeaders.from(axiosConfig.headers);
  const contentType =
    merged.get('Content-Type') ??
    merged.get('content-type') ??
    'application/json';

  const { version, appSecret, appId } = Config;

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

  const hmac = Crypto.createHmac('sha1', appSecret);
  hmac.update(canonical.join(','));
  const signature = hmac.digest('base64');

  merged.set('Authorization', `APIAuth ${appId}:${signature}`);
  merged.set('Date', date);
  merged.set('Content-Type', contentType);
  merged.set('Content-MD5', '');

  return {
    ...axiosConfig,
    headers: merged,
  };
};
