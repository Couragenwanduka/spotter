import { useState, useEffect } from 'react';
import Dropdown from '../../../component/dropdown/customDropdown'; // Custom dropdown component
import { GoArrowSwitch } from 'react-icons/go'; // Arrow switch icon
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'; // Arrow icons for dropdown
import { FaRegCalendarAlt } from 'react-icons/fa'; // Calendar icon

// Helper function to generate an array of days for a given month and year
function generateDaysInMonth(year: number, month: number) {
   new Date(year, month, 1);
  const daysInMonth = [];
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Generate days for the current month
  for (let i = 1; i <= lastDay; i++) {
    daysInMonth.push(i);
  }
  return daysInMonth;
}

const DatePicker = () => {
  // State for managing date selection and calendar display
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedReturn, setSelectedReturn] = useState<any>(null); // Return date state
  const [departure, setDeparture] = useState<any>(null);
  // const [selectedTripOption, setSelectedTripOption] = useState('Round Trip'); /

  // Trip options for dropdown
  const tripOptions = ['Round Trip', 'One-way', 'Multi-city'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility

  // Function to fill the return date based on departure and selected date
  const fillReturn = () => {
    if (!departure && selectedDate) {
      setDeparture(selectedDate); // Set departure date if it's not already set
    }

    if (selectedDate) {
      setSelectedReturn(selectedDate); // Set return date to selected date
    }
  };

  useEffect(() => {
    fillReturn(); // Update return date whenever selected date changes
  }, [selectedDate]);

  // Reset function to clear all dates
  const reset = () => {
    setSelectedDate('');
    setSelectedReturn('');
    setDeparture('');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Get the days for the current month
  const daysInMonth = generateDaysInMonth(currentYear, currentMonth);

  // Format the selected date as YYYY-MM-DD
  const formatSelectedDate = (day: number) => {
    return `${currentYear}-${currentMonth + 1}-${day < 10 ? `0${day}` : day}`;
  };

  // Handle the date selection and close calendar
  const handleDateSelect = (day: number) => {
    const formattedDate = formatSelectedDate(day);
    setSelectedDate(formattedDate);
    setShowCalendar(false); // Close the calendar after selecting the date
  };

  // Handle previous month button click
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Handle next month button click
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle Done button click to close the calendar
  const handleDoneClick = () => {
    setShowCalendar(false); // Close the calendar
  };

  return (
    <main>
      {/* Date Picker Section */}
      <div className="date-picker">
        {/* Input field for Departure and Return */}
        <div
          className="flex h-16 w-[180%] p-2 border border-[#6f7277] rounded"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <div className="flex justify-center items-center w-[50%]">
            <FaRegCalendarAlt />
            <input
              type="text"
              placeholder="Departure"
              className="border-none bg-transparent h-full w-full focus:outline-none rounded-l-md"
              value={departure}
            />
          </div>
          <div className="h-12 w-px bg-[#6f7277]"></div>
          <div className="w-[50%]">
            <input
              type="text"
              placeholder="Return"
              className="border-none bg-transparent h-full w-full focus:outline-none rounded-r-md"
              value={selectedReturn}
            />
          </div>
        </div>

        {/* Calendar dropdown when showCalendar is true */}
        {showCalendar && (
          <div className="calendar">
            {/* Trip Option Dropdown */}
            <div className="flex gap-20 p-3 items-center mb-10 w-full border-b border-[#6f7277]">
              <div className="calendar-dropdown">
                <div
                  onClick={toggleDropdown}
                  className="flex items-center cursor-pointer font-roboto gap-2"
                >
                  <span className="text-xl font-semibold">
                    <GoArrowSwitch />
                  </span>
                  {/* <p>{selectedTripOption}</p> */}
                  <button className="text-white border-none focus:outline-none">
                    {isDropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                  </button>
                </div>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <Dropdown options={tripOptions} isOpen={isDropdownOpen} />
                )}
              </div>
              <div onClick={reset} className="cursor-pointer">
                Reset
              </div>

              {/* Departure and Return Inputs inside calendar */}
              <div className="flex h-16 w-[50%] p-2 border border-[#6f7277] rounded">
                <div className="flex justify-center items-center w-[50%]">
                  <FaRegCalendarAlt />
                  <input
                    type="text"
                    placeholder="Departure"
                    className="border-none bg-transparent h-full w-full focus:outline-none rounded-l-md"
                    value={departure}
                  />
                </div>
                <div className="h-12 w-px bg-[#6f7277]"></div>
                <div className="w-[50%]">
                  <input
                    type="text"
                    placeholder="Return"
                    className="border-none bg-transparent h-full w-full focus:outline-none rounded-r-md"
                    value={selectedReturn}
                  />
                </div>
              </div>
            </div>

            {/* Calendar Header */}
            <div className="calendar-header">
              <button
                onClick={goToPreviousMonth}
                className="border-none focus:outline-none"
              >
                Prev
              </button>
              <span>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
              <button
                onClick={goToNextMonth}
                className="border-none focus:outline-none"
              >
                Next
              </button>
            </div>

            {/* Calendar Body (Days of the month) */}
            <div className="calendar-body">
              {daysInMonth.map((day) => (
                <button
                  key={day}
                  className="calendar-day"
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Done Button */}
            <div className="w-full border-t border-[#6f7277] mt-12"></div>
            <div className="flex float-end mt-5 mr-10 ">
              <button
                className="bg-[#8ab4f8] w-20 h-10 text-black font-roboto rounded-3xl"
                onClick={handleDoneClick} // Close calendar on Done
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DatePicker;
