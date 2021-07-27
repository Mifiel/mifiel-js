type ConfigParams = {
  appId: string;
  appSecret: string;
  url?: string;
};

export class Config {
  private _url: string;

  private _appId: string;

  private _appSecret: string;

  private constructor(params: ConfigParams) {
    this._appId = params.appId;
    this._appSecret = params.appSecret;
    this._url = params.url ?? 'https://www.mifiel.com/api/v1';
  }

  private static instance: Config;

  static setTokens(params: ConfigParams) {
    Config.instance = new Config(params);
  }

  get url() {
    return this._url;
  }

  get appId() {
    return this._appId;
  }

  get appSecret() {
    return this._appSecret;
  }

  static getInstance(params?: ConfigParams) {
    if (!Config.instance && params) {
      Config.instance = new Config(params);
    }

    if (params) {
      Config.instance = new Config(params);
    }

    return Config.instance;
  }

  useSandbox() {
    this._url = 'https://sandbox.mifiel.com/api/v1';
  }

  useStaging() {
    this._url = 'https://stageex.mifiel.com/api/v1';
  }

  useProd() {
    this._url = 'https://www.mifiel.com/api/v1';
  }
}