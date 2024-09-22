import { profileConfigs } from '../profile-configs.ts';
import DatePicker from 'react-datepicker';
import { Controller, Control } from 'react-hook-form';
import { useState } from 'react';
import { getYear } from 'date-fns/getYear';
import { getMonth } from 'date-fns/getMonth';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker/dist/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const range = (start: number, end: number) => {
  return new Array(end - start).fill(undefined).map((_, i) => start + i);
};
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default function DatePickerInput({
  control,
  controlName,
  selected,
  maxDate,
  minDate,
}: {
  control: Control;
  controlName: string;
  selected: Date;
  maxDate?: Date;
  minDate?: Date;
}) {
  const [date, setDate] = useState(selected);
  const handleChange = (dateChange: Date) => {
    setDate(dateChange);
  };
  return (
    <Controller
      name={controlName}
      control={control}
      defaultValue={date}
      render={({ field: { onChange } }) => (
        <DatePicker
          dateFormat={profileConfigs.defaultDateFormat}
          placeholderText={profileConfigs.defaultDateFormat}
          showIcon
          className="form-control"
          maxDate={maxDate}
          minDate={minDate}
          selected={date}
          onChange={onChange}
          onSelect={handleChange}
          renderCustomHeader={(props) => calendarHeader(props, minDate, maxDate)}></DatePicker>
      )}
    />
  );
}

const calendarHeader = function (
  props: ReactDatePickerCustomHeaderProps,
  minDate: Date,
  maxDate: Date,
) {
  const getYears = (): number[] => {
    const start = getYear(minDate) || 1960;
    const end = getYear(maxDate) || getYear(new Date()) + 15;
    return range(start, end + 1);
  };

  return (
    <div className="flex flex-row justify-between px-2">
      <button type="button" onClick={props.decreaseMonth} disabled={props.prevMonthButtonDisabled}>
        <FontAwesomeIcon icon="chevron-left" className="p-2" />
      </button>
      <div>
        <select
          className="bg-transparent p-1 me-1"
          value={getYear(props.date)}
          onChange={({ target: { value } }) => props.changeYear(+value)}>
          {getYears().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className="bg-transparent p-1"
          value={months[getMonth(props.date)]}
          onChange={({ target: { value } }) => props.changeMonth(months.indexOf(value))}>
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={props.increaseMonth} disabled={props.nextMonthButtonDisabled}>
        <FontAwesomeIcon icon="chevron-right" className="p-2" />
      </button>
    </div>
  );
};
