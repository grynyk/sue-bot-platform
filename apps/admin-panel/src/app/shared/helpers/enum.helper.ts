import { DropdownOption } from '../models';

export const getDropdownOptionsFromEnum = <T>(
  optionsEnum: object,
  valuesFromKeys = false,
  capitalized = true
): DropdownOption<T>[] => {
  const valuesToMap: string[] = valuesFromKeys
    ? Object.keys(optionsEnum)
    : Object.values(optionsEnum);
  const getLabel = (option) =>
    capitalized
      ? (
          option.charAt(0).toUpperCase() + option.toLowerCase().slice(1)
        ).replace(new RegExp('_', 'g'), ' ')
      : option.toUpperCase().replace(new RegExp('_', 'g'), ' ');
  return valuesToMap.map((option) => ({
    label: getLabel(option),
    value: option as T,
  }));
};
