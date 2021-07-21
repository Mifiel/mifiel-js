import { Config } from './Config';

describe('Config', () => {
  let config: Config;

  Config.setTokens({ appId: 'appId', appSecret: 'secret' });

  it('@setTokens', () => {
    config = Config.getInstance();

    expect(config.appId).toBe('appId');
    expect(config.appSecret).toBe('secret');
  });

  it('@useSandbox', () => {
    expect(config.url).toContain('www.mifiel.com');

    config.useSandbox();

    expect(config.url).toContain('sandbox.mifiel.com');
  });

  it('@useStaging', () => {
    expect(config.url).toContain('sandbox.mifiel.com');

    config.useStaging();

    expect(config.url).toContain('stageex.mifiel.com');
  });
});
