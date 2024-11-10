import { FC, useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onTotalPeopleChange: (total: number) => void;
  close: () => void;
}

const PersonDropDown: FC<Props> = ({ isOpen, onTotalPeopleChange, close }) => {
  // Initialize states for each category
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infantsInSeat, setInfantsInSeat] = useState(0);
  const [infantsOnLap, setInfantsOnLap] = useState(0);
  const MinuSignStyle =
    'text-3xl w-7 h-7 text-[#acbcd3] bg-[#4b4c50] flex items-center justify-center rounded-sm';
  const AddsignStyle =
    'text-2xl w-7 h-7 text-[#acbcd3] bg-[#394457] flex items-center justify-center rounded-sm';
  const signContainer = 'flex gap-5 font-roboto w-[50%]';
  const container =
    'flex gap-10 font-roboto  text-white text-opacity-60 items-center';
  // Handle increment and decrement for each category
  const handleAdd = (category: string) => {
    if (category === 'adults') {
      setAdults(adults + 1);
    } else if (category === 'children') {
      setChildren(children + 1);
    } else if (category === 'infantsInSeat') {
      setInfantsInSeat(infantsInSeat + 1);
    } else if (category === 'infantsOnLap') {
      setInfantsOnLap(infantsOnLap + 1);
    }
  };

  const handleSubtract = (category: string) => {
    if (category === 'adults' && adults > 0) {
      setAdults(adults - 1);
    } else if (category === 'children' && children > 0) {
      setChildren(children - 1);
    } else if (category === 'infantsInSeat' && infantsInSeat > 0) {
      setInfantsInSeat(infantsInSeat - 1);
    } else if (category === 'infantsOnLap' && infantsOnLap > 0) {
      setInfantsOnLap(infantsOnLap - 1);
    }
  };
  // Calculate the total number of people
  const getTotalPeople = () => {
    return adults + children + infantsInSeat + infantsOnLap;
  };

  // Call the callback whenever the total changes
  useEffect(() => {
    const total = getTotalPeople();
    onTotalPeopleChange(total); // Pass the total number of people to the parent
  }, [adults, children, infantsInSeat, infantsOnLap, onTotalPeopleChange]);

  const handleClose = () => {
    close(); // Close the dropdown
  };

  const handleCancel = () => {
    setAdults(0);
    setChildren(0);
    setInfantsInSeat(0);
    setInfantsOnLap(0);
    handleClose(); // Close the dropdown
  };

  return (
    <main className="relative inline-block text-left ">
      {isOpen && (
        <section className="absolute flex flex-col gap-5 mt-2 w-60 bg-[#303134] text-white border-none shadow-lg p-4">
          {/* Adults */}
          <div className={container}>
            <div className="w-[50%]">
              <h1>Adults</h1>
            </div>
            <div className={signContainer}>
              <span
                onClick={() => handleSubtract('adults')}
                className={MinuSignStyle}
              >
                {' '}
                -{' '}
              </span>
              <span>{adults}</span>
              <span
                onClick={() => handleAdd('adults')}
                className={AddsignStyle}
              >
                {' '}
                +{' '}
              </span>
            </div>
          </div>

          {/* Children */}
          <div className={container}>
            <div className="w-[50%]">
              <h1>Children</h1>
              <p className="text-xs mt-1">Aged 2-11</p>
            </div>
            <div className={signContainer}>
              <span
                onClick={() => handleSubtract('children')}
                className={MinuSignStyle}
              >
                {' '}
                -{' '}
              </span>
              <span>{children}</span>
              <span
                onClick={() => handleAdd('children')}
                className={AddsignStyle}
              >
                {' '}
                +{' '}
              </span>
            </div>
          </div>

          {/* Infants in seat */}
          <div className={container}>
            <div className="w-[50%]">
              <h1>Infants</h1>
              <p className="text-xs mt-1">In seat</p>
            </div>
            <div className={signContainer}>
              <span
                onClick={() => handleSubtract('infantsInSeat')}
                className={MinuSignStyle}
              >
                {' '}
                -{' '}
              </span>
              <span>{infantsInSeat}</span>
              <span
                onClick={() => handleAdd('infantsInSeat')}
                className={AddsignStyle}
              >
                {' '}
                +{' '}
              </span>
            </div>
          </div>

          {/* Infants on lap */}
          <div className={container}>
            <div className="w-[50%]">
              <h1>Infants</h1>
              <p className="text-xs mt-1">On lap</p>
            </div>
            <div className={signContainer}>
              <span
                onClick={() => handleSubtract('infantsOnLap')}
                className={MinuSignStyle}
              >
                {' '}
                -{' '}
              </span>
              <span>{infantsOnLap}</span>
              <span
                onClick={() => handleAdd('infantsOnLap')}
                className={AddsignStyle}
              >
                {' '}
                +{' '}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <section className="flex justify-center gap-5 font-roboto text-blue-400 border-none">
            <button
              className="border-none focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="border-none focus:outline-none"
              onClick={handleClose}
            >
              Done
            </button>
          </section>
        </section>
      )}
    </main>
  );
};

export default PersonDropDown;
