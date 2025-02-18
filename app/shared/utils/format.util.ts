import { includes } from 'lodash';
import moment, { Moment } from 'moment';

export class FormatUtils {
  public static isURL(value: string): boolean {
    try {
      const url: URL = new URL(value);
      const validProtocols: string[] = ['http:', 'https:'];
      if (!includes(validProtocols, url.protocol)) {
        throw new Error();
      }
      return true;
    } catch {
      return false;
    }
  }

  public static isTimeInSetDelayRange(
    targetTimestamp: Moment,
    currentTimestamp: Moment,
    startMinutesDelayRange = 10,
    endMinutesDelayRange = 1
  ): boolean {
    const startDelayEdge: Moment = moment(currentTimestamp).subtract(
      startMinutesDelayRange,
      'minutes'
    );
    const endDelayEdge: Moment = moment(currentTimestamp).add(
      endMinutesDelayRange,
      'minutes'
    );
    return targetTimestamp.isBetween(startDelayEdge, endDelayEdge);
  }

  public static convertTimeToTodaysDateTimestamp(
    time: string,
    currentTimestamp: Moment,
    returnValue: 'string' | 'moment'
  ): Moment;
  public static convertTimeToTodaysDateTimestamp(
    time: string,
    currentTimestamp: Moment,
    returnValue: 'string' | 'moment'
  ): string;
  public static convertTimeToTodaysDateTimestamp(
    time: string,
    currentTimestamp: Moment,
    returnValue: 'string' | 'moment'
  ): Moment | string {
    const todaysDate: string = currentTimestamp.format('YYYY-MM-DD');
    const timestamp: string = `${todaysDate}T${time}`;
    return returnValue === 'string' ? timestamp : moment(timestamp);
  }
}
