import CheckFlight from './landingpageComponent/checkFlight';
import { getIPLocation } from './utils/location';
import { useEffect, useState } from 'react';
import { fetchNearbyAirports } from './utils/getNearbyAirport';
import { BsQuestionCircle } from 'react-icons/bs';
import Tooltip from '../../component/tooltip/tooltip';
import CustomIcon from '../../assets/image/customIcon';
import FAQ from '../../component/dropdown/FAQ';
import Tab from './landingpageComponent/tab';
import Footer from './landingpageComponent/footer';
import { IoCarOutline } from 'react-icons/io5';
import { VscLocation } from 'react-icons/vsc';

interface Airport {
  name: string;
  code: string;
  location: string;
}

const LandingPage = () => {
  const [location, setLocation] = useState<{ Location: string } | null>(null);
  const [nearbyAirports, setNearbyAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      const loc = await getIPLocation();
      setLocation(loc);
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchNearbyAirport = async () => {
      setLoading(true);
      try {
        const airports = await fetchNearbyAirports();
        // console.log(airports);

        if (airports?.status && airports?.data?.nearby) {
          // Extract nearby airports array and ensure it matches the `Airport` structure
          const nearbyAirportData: Airport[] = airports.data.nearby.map(
            (airport: any) => ({
              name: airport.presentation?.title, // Extract airport name
              code: airport.navigation?.entityId, // Extract airport entity ID or code
              location: airport.presentation?.subtitle, // Extract location subtitle if available
            }),
          );

          setNearbyAirports(nearbyAirportData); // Update state with extracted data
        //   console.log(nearbyAirportData); 
        } else {
          console.error('No nearby airports data found');
        }
      } catch (error) {
        console.error('Error fetching nearby airports:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchNearbyAirport();
  }, []);

  return (
    <main className="w-screen h-full bg-primaryDarkMode">
      <section className="w-full h-full">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full h-80">
            <img
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-productSans text-[3.9rem] -mt-24">Flights</h1>
        </div>

        <div className="flex justify-center mt-6">
          <CheckFlight />
        </div>

        <div className="mt-20 md:ml-32 text-2xl font-productSans font-semibold">
          Cheap flights from {location?.Location}
        </div>

        <div className="flex md:ml-32 mt-8 text-xl font-productSans font-bold gap-4">
          <div>Popular airports near {location?.Location}</div>
          <Tooltip text="Distance and driving time are relative to the city centre. Airports are listed based on distance from the centre of Asaba and popularity with travellers.">
            <button className="border-none focus:outline-none">
              <BsQuestionCircle />
            </button>
          </Tooltip>
        </div>

        <div className="h-full">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="spinner-border text-white" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 gap-2 md:ml-32 mt-8">
              {nearbyAirports.map((airport: Airport) => (
                <div
                  key={airport.code}
                  className="flex items-center  p-4 rounded-lg bg-w h-full"
                >
                  {/* Left side - Icon, Airport Name, Location */}
                  <div className="flex  justify-center items-center gap-4">
                    <div>
                      <CustomIcon />
                    </div>
                    <div className="flex flex-col items-center">
                      
                     <div className='flex justify-center items-center gap-2'>
                     <div className="font-semibold text-lg">
                        {airport.name}
                      </div>

                      {/* Location */}
                      <div className="">
                        International Airport
                      </div>
                     </div>

                      <div className="flex  gap-2 text-sm">
                        <p>{airport.location}</p>
                        <p className="flex items-center gap-2">
                          <IoCarOutline /> 12hr
                        </p>
                        <p className="flex items-center gap-2">
                          <VscLocation /> 5km
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:ml-[7.5rem] focus:outline-none mt-10">
          <p className="text-xl font-productSans">
            Frequently asked questions about flying from {location?.Location}
          </p>
        </div>

        <div>
          <FAQ />
        </div>

        <div className="md:ml-[7.5rem]">
          <p className="mt-10 font-roboto text-2xl">Search more flights</p>
          <p className="font-roboto text-2xl mt-10">More places to fly</p>
          <Tab location={location?.Location} />
        </div>

        <div>
          <Footer location={location?.Location} />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
