import { StaticData, StaticDataItem } from '../../../static/models';
import { DataUtils } from '../data.util';

describe('DataUtils', () => {
  describe('getRandomItemFromArray', () => {
    it('should return a random item from an array', () => {
      const arr = [1, 2, 3, 4, 5];
      const item = DataUtils.getRandomItemFromArray(...arr);
      expect(arr).toContain(item);
    });
  });

  describe('equalOrHas', () => {
    it('should return true if the source array contains the target', () => {
      const source = [1, 2, 3];
      const target = 2;
      expect(DataUtils.equalOrHas(source, target)).toBe(true);
    });

    it('should return false if the source array does not contain the target', () => {
      const source = [1, 2, 3];
      const target = 4;
      expect(DataUtils.equalOrHas(source, target)).toBe(false);
    });

    it('should return true if the source is equal to the target', () => {
      const source = 2;
      const target = 2;
      expect(DataUtils.equalOrHas(source, target)).toBe(true);
    });

    it('should return false if the source is not equal to the target', () => {
      const source = 2;
      const target = 3;
      expect(DataUtils.equalOrHas(source, target)).toBe(false);
    });
  });

  describe('getAllStaticDataCallbacks', () => {
    it('should return all callback data from static data', () => {
      const staticData: StaticData = {
        data: [
          { callbackData: 'callback1' },
          { callbackData: ['callback2', 'callback3'] },
        ] as StaticDataItem[],
      };
      const result = DataUtils.getAllStaticDataCallbacks(staticData);
      expect(result).toEqual(['callback1', 'callback2', 'callback3']);
    });
  });

  describe('flattenObj', () => {
    it('should flatten a nested object into an array of values', () => {
      const target = {
        a: 1,
        b: { c: 2, d: { e: 3 } },
      };
      const result = DataUtils.flattenObj(target);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('isStringInUnionType', () => {
    it('should return true if the string is in the union type', () => {
      const values = ['a', 'b', 'c'] as const;
      const isInUnion = DataUtils.isStringInUnionType(values);
      expect(isInUnion('a')).toBe(true);
    });

    it('should return false if the string is not in the union type', () => {
      const values = ['a', 'b', 'c'] as const;
      const isInUnion = DataUtils.isStringInUnionType(values);
      expect(isInUnion('d')).toBe(false);
    });
  });

  describe('fillDefaultOptions', () => {
    it('should return default options if arg is null', () => {
      const defaultArg = { a: 1, b: 2 };
      const result = DataUtils.fillDefaultOptions(null, defaultArg);
      expect(result).toEqual(defaultArg);
    });

    it('should fill missing properties in arg with default options', () => {
      const arg = { a: 1 };
      const defaultArg = { a: 1, b: 2 };
      const result = DataUtils.fillDefaultOptions(arg, defaultArg);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should return arg if all properties are present', () => {
      const arg = { a: 1, b: 2 };
      const defaultArg = { a: 1, b: 2 };
      const result = DataUtils.fillDefaultOptions(arg, defaultArg);
      expect(result).toEqual(arg);
    });
  });
});
