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
    return inputValue >= index ? 'bg-amber-600' : 'bg-amber-200';
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
      <label className="form-label mb-2 text-dark-50" htmlFor={id}>
        {label}
      </label>
      <input {...register} className="slider-input hidden" type="number" id={id} ref={inputRef} />
      <div className="flex flex-row justify-between items-center bg-light-15 gap-1 rounded border border-amber-200 p-[2px]">
        {[...Array(max).keys()].slice(1).map((value) => (
          <button
            type="button"
            onClick={() => updateValue(value)}
            key={value}
            className={`${getBgColor(value)} inline-flex h-2 flex-auto`}></button>
        ))}
      </div>
      <div className="flex flex-row justify-between ">
        <span className="text-xs text-dark-40">{mappings[min as number]}</span>
        <span className="text-xs text-dark-40">{mappings[max as number]}</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
