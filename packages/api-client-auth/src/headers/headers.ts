import os from 'os';
import osName from 'os-name';
import * as pckg from '../../package.json';

const nodeVersion = `NODE/${process.versions.node}`;
const libraryVersion = `${pckg.name}/${pckg.version}`;
const axiosVersion = `axios/${pckg.dependencies.axios}`;
const osVersion = `(${osName()}/${os.release()})`;

export const headers = {
  'MI-ERROR-FORMAT': 'verbose',
  'User-Agent': `${nodeVersion} ${libraryVersion} ${axiosVersion} ${osVersion}`,
};
