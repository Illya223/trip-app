import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput({ selectedDate, onChange, minDate, maxDate }) {
  const [startDate, setStartDate] = useState(selectedDate);

  const handleChange = (date) => {
    if ((minDate && date < minDate) || (maxDate && date > maxDate)) {
      return; // Не обновляем состояние, если дата находится вне ограничений
    }
    setStartDate(date);
    onChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select date"
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}

export default DateInput;
