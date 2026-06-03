import { randomBytes } from 'node:crypto';

export function multipartHeaders() {
  const boundary = `----mifiel${randomBytes(16).toString('hex')}`;

  return {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  };
}
