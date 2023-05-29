import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
  appId: 'com.devopts.chatDevOpts',
  appName: 'chatDevOpts',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
