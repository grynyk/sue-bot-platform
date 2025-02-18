import { ENV } from '../enums';

export class EnvUtils {
  public static isDev(): boolean {
    return String(process.env.NODE_ENV) === ENV.DEV;
  }
  public static isProd(): boolean {
    return String(process.env.NODE_ENV) === ENV.PROD;
  }
  public static isStaging(): boolean {
    return String(process.env.NODE_ENV) === ENV.STAGING;
  }
}
