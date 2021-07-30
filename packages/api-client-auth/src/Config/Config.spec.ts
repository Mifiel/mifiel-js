import { Config } from './Config';

describe('Config', () => {
  Config.setTokens({ appId: 'appId', appSecret: 'secret' });

  it('@setTokens', () => {
    expect(Config.appId).toBe('appId');
    expect(Config.appSecret).toBe('secret');
  });

  it('@useSandbox', () => {
    expect(Config.url).toContain('www.mifiel.com');

    Config.useSandbox();

    expect(Config.url).toContain('sandbox.mifiel.com');
  });

  it('@useStaging', () => {
    expect(Config.url).toContain('sandbox.mifiel.com');

    Config.useStaging();

    expect(Config.url).toContain('stageex.mifiel.com');
  });
});
