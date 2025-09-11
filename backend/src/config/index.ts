import 'dotenv/config';
import { getEnv } from '../utils/getEnv';

export enum EnvList {
  LOCAL_DATABASE_URL = 'LOCAL_DATABASE_URL',
  PROD_DATABASE_URL = 'PROD_DATABASE_URL',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  STRIPE_SECRET_KEY = 'STRIPE_SECRET_KEY',
  GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET',
  GOOGLE_REDIRECT_URI = 'GOOGLE_REDIRECT_URI',
  META_APP_ID = 'META_APP_ID',
  META_APP_SECRET = 'META_APP_SECRET',
  META_APP_WHATSAPP_AUTH_CONFIG = 'META_APP_WHATSAPP_AUTH_CONFIG',
  META_APP_REDIRECT_URL = 'META_APP_REDIRECT_URL',
}

const env = getEnv(EnvList.NODE_ENV);

export const appConfig = {
  env,
  port: getEnv(EnvList.PORT) || 5000,
  db: {
    url: env === 'dev' ? getEnv(EnvList.LOCAL_DATABASE_URL) : getEnv(EnvList.PROD_DATABASE_URL),
  },
  stripe: {
    key: getEnv(EnvList.STRIPE_SECRET_KEY),
  },
  googleAuth: {
    GOOGLE_CLIENT_ID: getEnv(EnvList.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: getEnv(EnvList.GOOGLE_CLIENT_SECRET),
    GOOGLE_REDIRECT_URI: getEnv(EnvList.GOOGLE_REDIRECT_URI),
  },
  whatsapp: {
    appId: getEnv('META_APP_ID'),
    appSecret: getEnv('META_APP_SECRET'),
    authConfig: getEnv('META_APP_WHATSAPP_AUTH_CONFIG'),
    callbackUrl: getEnv('META_APP_REDIRECT_URL'),
  },
};
