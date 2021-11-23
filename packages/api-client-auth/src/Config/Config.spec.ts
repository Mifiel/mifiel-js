import { Config } from './Config';

describe('Config', () => {
  Config.setTokens({ appId: 'appId', appSecret: 'secret' });

  it('@setTokens', () => {
    expect(Config.appId).toBe('appId');
    expect(Config.appSecret).toBe('secret');
  });

  it('@useSandbox', () => {
    expect(Config.url).toContain('app.mifiel.com');

    Config.useSandbox();

    expect(Config.url).toContain('app-sandbox.mifiel.com');
  });

  it('@useStaging', () => {
    expect(Config.url).toContain('app-sandbox.mifiel.com');

    Config.useStaging();

    expect(Config.url).toContain('app-stageex.mifiel.com');
  });

  it('throws error if params are wrong', () => {
    const wrongParams = [
      {},
      { appId: '' },
      { appId: 'appId', appSecret: 1234 },
      { appId: 'appId', appSecret: 'secret', env: 'other' },
    ];

    wrongParams.forEach((params: any) => {
      expect(() => Config.setTokens(params)).toThrowError();
    });
  });
});
