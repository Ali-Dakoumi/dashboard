import { PLATFORM } from './platform';

interface PlatformConfig {
  logo: string;
  primaryColor: string;
}

interface AppEnvConfig {
  PLATFORM?: string;
  NODE_OPTIONS?: string;
  SEABEX_VERSION?: string;
  RELEASE_DATE?: string;
  PORT?: string;
  PUSHER_KEY_NETIRRIG?: string;
  NEXT_PUBLIC_PUSHER_HOST_NETIRRIG?: string;
  PUSHER_PORT_NETIRRIG?: string;
  NEXT_PUBLIC_NEXT_PUBLIC_BROADCASTING_URL_NETIRRIG?: string;
  NEXT_PUBLIC_DATABASE_URL?: string;
  GOOGLE_MAPS_API_KEY?: string;
  NEXT_PUBLIC_BROKER_URL?: string;
  PAYMEE_URL?: string;
  STRIPE_KEY_TEST?: string;
  STRIPE_KEY_LIVE?: string;
  NEXT_PUBLIC_CYPRESS_BASE_URL_NETIRRIG?: string;
  NEXTAUTH_SECRET?: string;
}

interface Config {
  [key: string]: PlatformConfig;
}

export const envConfig: AppEnvConfig = {
  PLATFORM: process.env.NEXT_PUBLIC_PLATFORM,
  NODE_OPTIONS: process.env.NODE_OPTIONS,
  SEABEX_VERSION: process.env.SEABEX_VERSION,
  RELEASE_DATE: process.env.RELEASE_DATE,
  PORT: process.env.PORT,
  PUSHER_KEY_NETIRRIG: process.env.PUSHER_KEY_NETIRRIG,
  NEXT_PUBLIC_PUSHER_HOST_NETIRRIG:
    process.env.NEXT_PUBLIC_PUSHER_HOST_NETIRRIG,
  PUSHER_PORT_NETIRRIG: process.env.PUSHER_PORT_NETIRRIG,
  NEXT_PUBLIC_NEXT_PUBLIC_BROADCASTING_URL_NETIRRIG:
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_BROADCASTING_URL_NETIRRIG,
  NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_BROKER_URL: process.env.NEXT_PUBLIC_BROKER_URL,
  PAYMEE_URL: process.env.PAYMEE_URL,
  STRIPE_KEY_TEST: process.env.STRIPE_KEY_TEST,
  STRIPE_KEY_LIVE: process.env.STRIPE_KEY_LIVE,
  NEXT_PUBLIC_CYPRESS_BASE_URL_NETIRRIG:
    process.env.NEXT_PUBLIC_CYPRESS_BASE_URL_NETIRRIG,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
};

const config: Config = {
  agrisense: {
    logo: '/logo-agrisense.png',
    primaryColor: '#00A859'
  },
  netirrig: {
    logo: '/logo-netirrig.png',
    primaryColor: '#0077B6'
  }
};

export const platformConfig: PlatformConfig = {
  ...config[PLATFORM]
};
