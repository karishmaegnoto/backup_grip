import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import ErrorMessage from "../FormFields/ErrorMessage";
import { CalendarClock } from "lucide-react";

function ODateTimePicker({
  handleDateChange,
  value,
  minDate,
  maxDate,
  placeholder,
  dateError,
  moduleType,
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
    <div>
      <Flatpickr
        name="date"
        placeholder={placeholder}
        value={dates}
        options={{
          minDate,
          maxDate,
          dateFormat: "d-m-Y - h:i K",
          enableTime: true,
          time_24hr: false,
        }}
        onChange={onChange}
        {...rest}
      />

      <span className="flat-picker-icon">
        <CalendarClock color="#595D6B" size={20} />
      </span>
      {dateError && <ErrorMessage message={dateError} />}
    </div>
  );
}

export default ODateTimePicker;
