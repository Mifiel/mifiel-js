type ConfigParams = {
  appId: string;
  appSecret: string;
  env?: 'production' | 'staging' | 'sandbox';
};

export class Config {
  private static _env: ConfigParams['env'];

  private static _appId: string;

  private static _appSecret: string;

  private static _version = 'v1';

  static setTokens(params: ConfigParams) {
    this._appId = params.appId;
    this._appSecret = params.appSecret;
    this._env = params.env ?? 'production';
  }

  static get version() {
    return this._version;
  }

  static get url() {
    const hosts = {
      production: 'https://www.mifiel.com',
      sandbox: 'https://sandbox.mifiel.com',
      staging: 'https://stageex.mifiel.com',
    };

    const currentHost = hosts[this._env] ?? hosts.production;

    return `${currentHost}/api/${this._version}`;
  }

  static get appId() {
    return this._appId;
  }

  static get appSecret() {
    return this._appSecret;
  }

  static useSandbox() {
    this._env = 'sandbox';
  }

  static useStaging() {
    this._env = 'staging';
  }

  static useProd() {
    this._env = 'production';
  }
}
