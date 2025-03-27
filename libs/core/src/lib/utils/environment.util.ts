import { ENV } from '../config/config-keys';

export function isDev(): boolean {
  return String(process.env['NODE_ENV']) === ENV.DEV;
}
export function isProd(): boolean {
  return String(process.env['NODE_ENV']) === ENV.PROD;
}
export function isStaging(): boolean {
  return String(process.env['NODE_ENV']) === ENV.STAGING;
}
