import { Config } from './Config';

describe('Config', () => {
  it('@setTokens', () => {
    Config.setTokens('appId', 'secret');

    expect(Config.appID).toBe('appId');
    expect(Config.appSecret).toBe('secret');
  });

  it('@useSandbox', () => {
    expect(Config.url).toContain('www.mifiel.com');
    Config.useSandbox();

    expect(Config.url).toContain('sandbox.mifiel.com');
  });
});
