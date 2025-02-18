import { StaticData, StaticDataItem } from '../../static/models';
import { isNil } from 'lodash';

type WrappedInFormField<T> = {
  [P in keyof T]: T[P];
};

export class DataUtils {
  /**
   * Returns a random item from an array.
   * @param {T[]} arr - The array to pick a random item from.
   * @returns {T} - A random item from the array.
   */
  public static getRandomItemFromArray<T>(...arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Checks if the source is equal to or contains the target.
   * @param {T | T[]} source - The source value or array.
   * @param {T} target - The target value.
   * @returns {boolean} - True if the source is equal to or contains the target, false otherwise.
   */
  public static equalOrHas<T>(source: T | T[], target: T): boolean {
    return source instanceof Array
      ? source.includes(target)
      : target === source;
  }

  public static getAllStaticDataCallbacks(staticData: StaticData): string[] {
    return staticData.data
      .map((item: StaticDataItem): string | string[] => item.callbackData)
      .flat();
  }

  /**
   * Flattens an object into an array of its values.
   * @param {object} target - The object to flatten.
   * @param {T[]} [result=[]] - The result array to store flattened values.
   * @returns {T[]} - The flattened array of values.
   */
  public static flattenObj<T>(target: object, result: T[] = []): T[] {
    Object.values(target).forEach((value): void => {
      if (typeof value === 'object' && value !== null) {
        DataUtils.flattenObj(value, result);
      } else {
        result.push(value);
      }
    });
    return result;
  }

  /**
   * Checks if a string is in a union type.
   * @param {readonly T[]} values - The array of union type values.
   * @returns {(raw: RawType) => boolean} - A function that checks if a raw value is in the union type.
   */
  public static isStringInUnionType = <RawType, T extends RawType>(
    values: readonly T[]
  ): ((raw: RawType) => boolean) => {
    return (raw: RawType): boolean => {
      return values.some((value: T): boolean => value === raw);
    };
  };

  public static fillDefaultOptions<T>(
    arg: T | null,
    defaultArg: T
  ): WrappedInFormField<T> {
    if (isNil(defaultArg)) {
      return {} as WrappedInFormField<T>;
    }
    if (isNil(arg)) {
      return defaultArg as WrappedInFormField<T>;
    }
    const result: T = { ...arg };
    Object.entries(defaultArg).forEach(([key, value]): void => {
      if (!Object.prototype.hasOwnProperty.call(arg, key)) {
        result[key] = value;
      }
    });
    return result as WrappedInFormField<T>;
  }
}
