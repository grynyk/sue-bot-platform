import { FormatUtils } from '../format.util';
import moment, { Moment } from 'moment';

describe('FormatUtils', () => {
  describe('isURL', () => {
    it('should return true for valid URLs', () => {
      expect(FormatUtils.isURL('http://fake-url.com')).toBe(true);
      expect(FormatUtils.isURL('https://fake-url.com')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(FormatUtils.isURL('ftp://fake-url.com')).toBe(false);
      expect(FormatUtils.isURL('invalid-url')).toBe(false);
    });
  });

  describe('isTimeInSetDelayRange', () => {
    it('should return true if targetTimestamp is within the delay range', () => {
      const currentTimestamp = moment();
      const targetTimestamp = moment(currentTimestamp).subtract(5, 'minutes');
      expect(
        FormatUtils.isTimeInSetDelayRange(targetTimestamp, currentTimestamp)
      ).toBe(true);
    });

    it('should return false if targetTimestamp is outside the delay range', () => {
      const currentTimestamp = moment();
      const targetTimestamp = moment(currentTimestamp).subtract(15, 'minutes');
      expect(
        FormatUtils.isTimeInSetDelayRange(targetTimestamp, currentTimestamp)
      ).toBe(false);
    });
  });

  describe('convertTimeToTodaysDateTimestamp', () => {
    it('should return timestamp as string', () => {
      const currentTimestamp = moment('2023-10-10T10:00:00');
      const time = '12:00:00';
      const result = FormatUtils.convertTimeToTodaysDateTimestamp(
        time,
        currentTimestamp,
        'string'
      );
      expect(result).toBe('2023-10-10T12:00:00');
    });

    it('should return timestamp as moment object', () => {
      const currentTimestamp = moment('2023-10-10T10:00:00');
      const time = '12:00:00';
      const result: Moment = FormatUtils.convertTimeToTodaysDateTimestamp(
        time,
        currentTimestamp,
        'moment'
      );
      expect(result.format()).toBe('2023-10-10T12:00:00+02:00');
    });
  });
});
