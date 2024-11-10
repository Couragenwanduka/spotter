import ExploreSection from './exploreSection';
import { GoArrowSwitch } from 'react-icons/go';
import { FaRegCircle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import DatePicker from './datePicker';
import { useState, useEffect, useRef } from 'react';
import { getIPLocation } from '../utils/location';
import { fetchNearbyAirports } from '../utils/getNearbyAirport';
import { MdArrowForwardIos } from 'react-icons/md';
import { searchAirports } from '../utils/getNearbyAirport';
import { MdSearch } from 'react-icons/md';

interface Airport {
  name: string;
  code: string;
  location: string;
}

const CheckFlight = () => {
  const [location, setLocation] = useState<{ Location: string } | null>(null);
  const [nearbyAirports, setNearbyAirports] = useState<Airport[]>([]);
  const [showDiv, setShowDiv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch the user's location when the component mounts
  useEffect(() => {
    const fetchLocation = async () => {
      const loc = await getIPLocation();
      setLocation(loc);
    };
    fetchLocation();
  }, []);

  // Fetch nearby airports when the component mounts, but only if not already fetched
  useEffect(() => {
    if (nearbyAirports.length === 0) {
      const fetchNearbyAirport = async () => {
        setLoading(true);
        try {
          const airports = await fetchNearbyAirports();
          if (airports?.status && airports?.data?.nearby) {
            const nearbyAirportData: Airport[] = airports.data.nearby.map(
              (airport: any) => ({
                name: airport.presentation?.title,
                code: airport.navigation?.entityId,
                location: airport.presentation?.subtitle,
              }),
            );
            setNearbyAirports(nearbyAirportData);
          } else {
            console.error('No nearby airports data found');
          }
        } catch (error) {
          console.error('Error fetching nearby airports:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchNearbyAirport();
    }
  }, [nearbyAirports]);

  // Handle input change for the search box with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (value) {
        const data = await searchAirports(value);
        if (data) {
          setNearbyAirports(data);
        }
      } else {
        // Optionally, reset nearby airports if search is cleared
        setNearbyAirports([]);
      }
    }, 900); // Adjust debounce delay as needed
  };

  return (
    <main className="relative flex flex-col w-full max-w-screen-xl mx-auto p-4 md:bg-[#36373a] shadow-xl shadow-black/30 rounded-lg">
      <div>
        <div className="mt-2 md:ml-5">
          <ExploreSection />
        </div>

        <section className="flex gap-5 w-full items-center md:ml-6 -mt-3 flex-wrap sm:flex-nowrap">
          <div className="flex w-full sm:w-auto relative gap-2">
            <div
              className="relative border border-[#6f7277] h-16 w-full sm:w-[300px] rounded overflow-hidden flex items-center"
              onClick={() => setShowDiv(true)}
            >
              <div className="ml-3">
                <FaRegCircle />
              </div>
              <input
                type="text"
                className="bg-transparent border-none h-full w-full focus:outline-none pl-8"
                placeholder={location?.Location || 'Where from?'}
                onChange={handleInputChange}
              />
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#36373a] rounded-full border border-[#6f7277] flex items-center justify-center z-10">
              <div className="h-[120%] w-2 bg-[#36373a] absolute left-1/2 transform -translate-x-1/2 z-20"></div>
              <GoArrowSwitch className="z-50" />
            </div>

            <div className="relative border border-[#6f7277] h-16 w-full sm:w-[300px] rounded overflow-hidden flex items-center">
              <div className="ml-5 text-xl">
                <IoLocationOutline />
              </div>
              <input
                type="text"
                className="bg-transparent border-none h-full w-full focus:outline-none pr-8"
                placeholder="Where to?"
              />
            </div>
          </div>

          <div className="flex h-16 w-full sm:w-[30%] mt-3 sm:mt-0">
            <DatePicker />
          </div>
        </section>

        <button className="absolute -bottom-5 left-[50%] transform -translate-x-1/2 flex items-center gap-1 px-4 py-2 text-black bg-[#8ab4f8] rounded-3xl text-lg hover:bg-blue-700">
          <MdSearch /> Explore
        </button>
      </div>

      {showDiv && (
        <div
          className="absolute top-[29rem] left-[9.5rem] w-[40rem] bg-[#36373a] border-none max-h-80 h-[15rem] overflow-y-auto z-10 sm:left-[50%] sm:w-[90%] sm:top-[unset] sm:bottom-[0]"
          onClick={() => setShowDiv(false)}
        >
          {loading ? (
            <p>Loading airports...</p>
          ) : nearbyAirports.length > 0 ? (
            nearbyAirports.map((airport, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="airport-info flex gap-4 w-full max-w-4xl p-2 border-b border-gray-300">
                  <div className="w-[10%] flex justify-center">
                    <IoLocationOutline />
                  </div>
                  <div className="flex gap-6 w-full">
                    <p className="w-[30%] font-semibold">
                      <strong>Name:</strong> {airport.name}
                    </p>
                    <p className="w-[30%] font-semibold">
                      <strong>Code:</strong> {airport.code}
                    </p>
                    <p className="w-[30%] font-semibold">
                      <strong>Location:</strong> {airport.location}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No nearby airports found.</p>
          )}
        </div>
      )}

      <div className="flex mt-20  items-center font-roboto gap-3 text-sm sm:text-base">
        <p className="text-[#8ab4f8]">Flights</p>
        <MdArrowForwardIos />
        <p className="flex items-center text-center">
          From {location?.Location}
        </p>
      </div>
    </main>
  );
};

export default CheckFlight;
