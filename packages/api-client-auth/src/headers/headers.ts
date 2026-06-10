import os from 'os';
import * as pckg from '../../package.json';

const platformNames: Record<string, string> = {
  darwin: 'macOS',
  win32: 'Windows',
  linux: 'Linux',
};

const nodeVersion = `NODE/${process.versions.node}`;
const libraryVersion = `${pckg.name}/${pckg.version}`;
const axiosVersion = `axios/${pckg.dependencies.axios}`;
const osVersion = `(${platformNames[os.platform()] ?? os.platform()}/${os.release()})`;

export const headers = {
  'MI-ERROR-FORMAT': 'verbose',
  'User-Agent': `${nodeVersion} ${libraryVersion} ${axiosVersion} ${osVersion}`,
};
