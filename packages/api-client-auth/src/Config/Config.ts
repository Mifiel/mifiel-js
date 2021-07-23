export class Config {
  static url = 'https://www.mifiel.com/api/v1';

  static appID: string;

  static appSecret: string;

  static setTokens(appID: string, appSecret: string) {
    this.appID = appID;
    this.appSecret = appSecret;
  }

  static useSandbox() {
    this.url = 'https://sandbox.mifiel.com/api/v1';
  }
}
