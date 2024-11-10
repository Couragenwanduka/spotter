import { useState, FC } from 'react';

interface Props {
  location?: string;
}

const Tab: FC<Props> = ({ location }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleIndex = (index: number) => {
    setTabIndex(index);
  };

  const tab1 = [
    'Flights from Asaba to Lagos',
    'Flights from Asaba to Abuja',
    'Flights from Asaba to Port Harcourt',
    'Flights from Asaba to Kano',
    'Flights from Asaba to Enugu',
    'Flights from Asaba to London',
    'Flights from Asaba to Accra',
    'Flights from Asaba to Owerri',
    'Flights from Asaba to Benin City',
    'Flights from Asaba to Warri',
    'Flights from Asaba to Yola',
    'Flights from Asaba to Ibadan',
    'Flights from Asaba to Calabar',
    'Flights from Asaba to Abidjan',
    'Flights from Asaba to Sokoto',
    'Flights from Asaba to Monrovia',
    'Flights from Asaba to Dakar',
    'Flights from Asaba to Banjul',
    'Flights from Asaba to Maiduguri',
    'Flights from Asaba to Ilorin',
  ];

  const tab2 = [
    'Flights from Lagos',
    'Flights from Accra',
    'Flights from Abuja',
    'Flights from Douala',
    'Flights from Yaoundé',
    'Flights from Cotonou',
    'Flights from Libreville',
    'Flights from Lomé',
    'Flights from Malabo',
    'Flights from Niamey',
  ];

  return (
    <main>
      <div className="flex gap-10 mt-10 border-b border-[#dadce0] pb-5 w-[95%]">
        <button
          onClick={() => handleIndex(0)}
          className={`border-none outline-none focus:outline-none ${
            tabIndex === 0
              ? 'text-[#8ab4f8] font-semibold border-b-2 border-blue-500 '
              : 'text-gray-600'
          }`}
        >
          Popular destinations from Asaba
        </button>
        <button
          onClick={() => handleIndex(1)}
          className={`border-none outline-none focus:outline-none ${
            tabIndex === 1
              ? 'text-blue-500 font-semibold border-b-2 border-blue-500'
              : 'text-gray-600'
          }`}
        >
          Flights from other cities
        </button>
        <button
          onClick={() => handleIndex(2)}
          className={`border-none outline-none focus:outline-none ${
            tabIndex === 2
              ? 'text-blue-500 font-semibold border-b-2 border-blue-500'
              : 'text-gray-600'
          }`}
        >
          Flights to {location}
        </button>
      </div>
      <section className="h-[90%]">
        {tabIndex === 0 && (
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[#8ab4f8] space-y-2 mt-5 pl-3">
            {tab1.map((tab, index) => (
              <li key={index} className="hover:text-[#647a9f]">
                {tab}
              </li>
            ))}
          </ul>
        )}
        {tabIndex === 1 && (
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[#8ab4f8] space-y-2 mt-5 pl-3">
            {tab2.map((tab, index) => (
              <li key={index} className="hover:text-[#647a9f]">
                {tab}
              </li>
            ))}
          </ul>
        )}
        {tabIndex === 2 && (
          <p className="text-[#8ab4f8] ml-4 mt-4">Flights to {location}</p>
        )}
      </section>
    </main>
  );
};

export default Tab;
