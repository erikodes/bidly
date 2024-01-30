import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bidly.app',
  appName: 'Bidly',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
