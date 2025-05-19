import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ODatePicker from "./ODatePicker";
import leadStyle from "@/app/[slug]/leads/lead.module.scss";

function DateRangePicker({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onStartDateChange,
  onEndDateChange,
  dateFormat = "Y-m-d",
  placeholderStart = "Select Start Date",
  placeholderEnd = "Select End Date",
  startDateError = "",
  endDateError = "",
  className = "",
  pickerClassName = leadStyle.form_floating_flat,
  titleStateDate = "YYYY-MM-DD",
  titleEndDate = "YYYY-MM-DD",
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);

    console.log("date", date);
    if (onStartDateChange) onStartDateChange(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (onEndDateChange) onEndDateChange(date);
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      <div className={pickerClassName}>
        <ODatePicker
          handleDateChange={handleStartDateChange}
          value={startDate}
          maxDate={endDate}
          placeholder={placeholderStart}
          dateError={startDateError}
          dateFormat={dateFormat}
        />
        {titleStateDate && <label htmlFor="">{titleStateDate}</label>}
      </div>
      <div className={pickerClassName}>
        <ODatePicker
          handleDateChange={handleEndDateChange}
          value={endDate}
          minDate={startDate}
          placeholder={placeholderEnd}
          dateError={endDateError}
          dateFormat={dateFormat}
        />
        {titleEndDate && <label htmlFor="">{titleEndDate}</label>}
      </div>
    </div>
  );
}

export default DateRangePicker;
