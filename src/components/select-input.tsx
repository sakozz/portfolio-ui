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
  onChange,
  optionsPromise,
}: {
  onChange: OnChangeFn;
  optionsPromise: OptionsPromiseFn;
}) {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isMulti
      unstyled={true}
      onChange={(value) => onChange(value as MultiValue<SelectOption>)}
      classNamePrefix={'custom'}
      closeMenuOnSelect={false}
      components={animatedComponents}
      loadOptions={optionsPromise}
      className={'w-full'}
    />
  );
}
