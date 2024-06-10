import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    // Update state with the selected date
    setSelectedDate(newDate);

    // Convert date to desired format (YYYY-MM-DD) before saving to localStorage
    const formattedDate = newDate ? newDate.format("YYYY-MM-DD") : null;
    localStorage.setItem("selectedDate", formattedDate);
  };

  return (
    <DatePicker
      inputClass="datetime-local"
      value={selectedDate}
      onChange={handleDateChange}
      multiple={false} // Set to allow only one date selection
    />
  );
}
