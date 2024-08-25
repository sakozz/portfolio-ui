import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { MultiValue } from 'react-select';

type OnChangeFn = (value: MultiValue<SelectOption>) => void;
type OptionsPromiseFn = (value: string) => Promise<SelectOption[]>;
export type SelectOption = {
  label: string;
  value: unknown;
  isFixed?: boolean;
};

const animatedComponents = makeAnimated();

export default function SelectInput({
  selectedOptions,
  onChange,
  optionsPromise,
}: {
  onChange: OnChangeFn;
  optionsPromise: OptionsPromiseFn;
  selectedOptions?: SelectOption[];
}) {
  const handleChange = (changedValue: MultiValue<unknown>) => {
    const values = changedValue as MultiValue<SelectOption>;
    const distinctValues = values.reduce((collection, value) => {
      if (!collection.some((item) => item.label == value.label)) {
        collection.push(value);
      }
      return collection;
    }, []);
    onChange(distinctValues);
  };
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      defaultValue={selectedOptions}
      isMulti
      unstyled={true}
      onChange={handleChange}
      classNamePrefix={'custom'}
      closeMenuOnSelect={false}
      components={animatedComponents}
      loadOptions={optionsPromise}
      className={'w-full'}
    />
  );
}
