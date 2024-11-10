import { useState } from 'react';
import { GoArrowSwitch } from 'react-icons/go';
import Dropdown from '../../../component/dropdown/customDropdown';
import PresonDropDown from '../../../component/dropdown/presonDropdown';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { MdOutlinePersonOutline } from 'react-icons/md';

const ExploreSection = () => {
  const [totalPeople, setTotalPeople] = useState(0);
  const tripOptions = ['Round Trip', 'One-way', 'Multi-city'];
  const ticket = ['Economy', 'Premium Economy', 'Business', 'First'];

  // Separate dropdown states and active states for each dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const [isDropdown3Open, setIsDropdown3Open] = useState(false);

  // Handle selection and make sure only one dropdown is active at a time
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Toggle dropdown visibility and set active dropdown
  const toggleDropdown = (dropdownIndex: number) => {
    if (dropdownIndex === 1) {
      setIsDropdownOpen((prev) => !prev);
      setIsDropdown2Open(false); // Close the second dropdown when the first one is toggled
      setActiveDropdown(1);
    } else if (dropdownIndex === 2) {
      setIsDropdown2Open((prev) => !prev);
      setIsDropdownOpen(false); // Close the first dropdown when the second one is toggled
      setActiveDropdown(2);
    } else if (dropdownIndex === 3) {
      setIsDropdown3Open((prev) => !prev);
      setIsDropdown2Open(false); // Close the second dropdown when the third one is toggled
      setActiveDropdown(3);
    }
  };

  const close = () => {
    setIsDropdown2Open(false);
  };

  return (
    <main>
      <section className="flex md:gap-6">
        <div>
          <div
            onClick={() => toggleDropdown(1)} // Pass 1 for the first dropdown
            className={`flex items-center cursor-pointer font-roboto gap-2 h-10 w-40 justify-center ${
              activeDropdown === 1
                ? 'bg-[#394458] border-b border-blue-300'
                : ''
            }`}
          >
            <span className="text-xl font-semibold">
              <GoArrowSwitch />
            </span>
            <p>Round Trip</p>
            <button
              className={`text-white border-none focus:outline-none ${
                activeDropdown === 1 ? 'text-blue-400' : ''
              }`}
            >
              {isDropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </button>
          </div>

          {/* Pass the state to Dropdown */}
          <Dropdown options={tripOptions} isOpen={isDropdownOpen} />
        </div>

        <div>
          <div
            onClick={() => toggleDropdown(2)} // Pass 1 for the first dropdown
            className={`flex w-20 justify-center  items-center cursor-pointer font-roboto h-10  gap-2 ${
              activeDropdown === 2
                ? 'bg-[#394458] border-b border-blue-300'
                : ''
            }`}
          >
            <span className="text-xl font-semibold">
              <MdOutlinePersonOutline />
            </span>
            <p>{totalPeople || 1}</p>
            <button
              className={`text-white border-none focus:outline-none ${
                activeDropdown === 2 ? 'text-blue-400' : ''
              }`}
            >
              {isDropdown2Open ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </button>
          </div>
          <PresonDropDown
            isOpen={isDropdown2Open}
            onTotalPeopleChange={setTotalPeople}
            close={close}
          />
        </div>

        <div>
          <div
            onClick={() => toggleDropdown(3)} // Pass 2 for the second dropdown
            className={`flex w-32 justify-center items-center cursor-pointer font-roboto gap-2 h-10 ${
              activeDropdown === 3
                ? 'bg-[#394458] border-b border-blue-300'
                : ''
            }`}
          >
            <p>Economy</p>
            <button
              className={`text-white border-none focus:outline-none ${
                activeDropdown === 3 ? 'text-blue-400' : ''
              }`}
            >
              {isDropdown3Open ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </button>
          </div>

          {/* Pass the state to Dropdown */}
          <Dropdown options={ticket} isOpen={isDropdown3Open} />
        </div>
      </section>
    </main>
  );
};

export default ExploreSection;
