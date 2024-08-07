import { configParamsSchema, ConfigParamsSchema } from './config.types';

export class Config {
  private static _env: ConfigParamsSchema['env'];

  private static _appId = '';

  private static _appSecret = '';

  private static _version = 'v1';

  static setTokens(params: ConfigParamsSchema) {
    const validatedParams = configParamsSchema.parse(params);

    this._appId = validatedParams.appId;
    this._appSecret = validatedParams.appSecret;
    this._env = validatedParams.env ?? 'production';
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
      production: 'https://app.mifiel.com',
      sandbox: 'https://app-sandbox.mifiel.com',
      staging: 'https://app-stageex.mifiel.com',
      qa: 'https://app-qa.mifiel.com',
    };

    const currentHost = hosts[this._env || 'production'];

    return `${currentHost}/api/${this._version}`;
  }

  static useSandbox() {
    this._env = 'sandbox';
  }

  static useStaging() {
    this._env = 'staging';
  }

  static useQA() {
    this._env = 'qa';
  }

  static useProduction() {
    this._env = 'production';
  }

  static get version() {
    return this._version;
  }
}
