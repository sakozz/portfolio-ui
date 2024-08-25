import { useEffect, useRef, useState } from 'react';
import { randomId } from '../lib/misc.ts';
import { competenceMap } from '../types/cometence-mapping.ts';

const mappings = competenceMap;
export default function SliderInput({
  max,
  min,
  label,
  value,
  register,
  onChange,
  error,
}: {
  max: number | string;
  min: number | string;
  label: string;
  value: number;
  register: Record<string, unknown>;
  onChange: (value: number) => void;
  error: string;
}) {
  const [inputValue, setInputValue] = useState<number>(0);
  const id = randomId();
  const getBgColor = (index: number) => {
    let classNames = inputValue >= index ? 'bg-secondary-400' : 'bg-secondary-50';
    if (index == 1) classNames += ' rounded-s-[3px]';
    if (index == 5) classNames += ' rounded-e-[3px]';
    return classNames;
  };

  const updateValue = (value: number) => {
    setInputValue(value);
    onChange(value);
  };

  const inputRef = useRef();
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="flex flex-col w-full">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input {...register} className="slider-input hidden" type="number" id={id} ref={inputRef} />
      <div className="flex flex-row justify-between items-center bg-primary-200 gap-1 rounded p-[3px]">
        {[...Array(max).keys()].map((value) => (
          <button
            type="button"
            onClick={() => updateValue(value + 1)}
            key={value + 1}
            className={`${getBgColor(value + 1)} inline-flex h-3 flex-auto`}></button>
        ))}
      </div>
      <div className="flex flex-row justify-between ">
        <span className="text-xs text-primary-400">{mappings[min as number]}</span>
        <span className="text-xs text-primary-400">{mappings[max as number]}</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
