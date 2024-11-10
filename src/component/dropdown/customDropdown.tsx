import { FC, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';

interface Props {
  options: string[];
  isOpen?: boolean;
}

const Dropdown: FC<Props> = ({ options, isOpen }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0] || null,
  );

  // Handle item selection
  const handleSelect = (item: string) => {
    setSelectedOption(item);
    // Optionally close the dropdown after selection if required
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right- mt-2 w-48 bg-[#303134] text-white border-none shadow-lg z-30">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer flex items-center font-roboto gap-5 text-white text-opacity-60 ${
                  selectedOption === option
                    ? 'bg-[#394458]'
                    : 'hover:bg-[#36373a]'
                }`}
              >
                <span className="w-4 flex items-center">
                  {selectedOption === option && <IoCheckmark />}
                </span>
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
