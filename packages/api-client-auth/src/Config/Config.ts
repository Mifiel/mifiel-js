import { configParamsSchema, ConfigParamsSchema } from './config.types';

export class Config {
  private static _env: ConfigParamsSchema['env'];

  private static _appId = '';

  private static _appSecret = '';

  private static _hmacDigest: ConfigParamsSchema['hmacDigest'] = 'sha1';

  private static _version = 'v1';

  static setTokens(params: ConfigParamsSchema) {
    configParamsSchema.parse(params);

    this._appId = params.appId;
    this._appSecret = params.appSecret;
    this._env = params.env ?? 'production';
    this._hmacDigest = params.hmacDigest ?? 'sha1';
  }

  static get appId() {
    return this._appId;
  }

  static get appSecret() {
    return this._appSecret;
  }

  static get env() {
    return this._env;
  }

  static get url() {
    const hosts = {
      production: 'https://www.mifiel.com',
      sandbox: 'https://sandbox.mifiel.com',
      staging: 'https://stageex.mifiel.com',
    };

    const currentHost = hosts[this._env || 'production'];

    return `${currentHost}/api/${this._version}`;
  }

  static get hmacDigest() {
    return this._hmacDigest ?? 'sha1';
  }

  static useSandbox() {
    this._env = 'sandbox';
  }

  static useStaging() {
    this._env = 'staging';
  }

  static useProduction() {
    this._env = 'production';
  }

  static get version() {
    return this._version;
  }
}
