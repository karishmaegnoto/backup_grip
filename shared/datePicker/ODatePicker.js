import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import ErrorMessage from "../FormFields/ErrorMessage";
import { CalendarClock } from "lucide-react";

function ODatePicker({
  handleDateChange,
  value,
  minDate,
  maxDate,
  placeholder,
  dateError,
  dateFormat = "d-m-Y",
  ...rest
}) {
  const [dates, setDate] = useState(value || "");

  useEffect(() => {
    setDate(value);
  }, [value]);

  const onChange = ([date]) => {
    setDate(date);
    handleDateChange(date);
  };
  return (
    <div className="w-full">
      <div className="relative">
        <Flatpickr
          name="date"
          placeholder={placeholder}
          value={dates}
          options={{
            minDate,
            dateFormat: dateFormat,
            maxDate,
            // defaultDate: dates,
          }}
          onChange={onChange}
          {...rest}
        />
        <span className="flat-picker-icon">
          <CalendarClock color="#595D6B" size={20} />
        </span>
      </div>
      {dateError && <ErrorMessage message={dateError} />}
    </div>
  );
}

export default ODatePicker;
