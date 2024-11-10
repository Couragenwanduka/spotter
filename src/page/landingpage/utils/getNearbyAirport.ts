import axios from 'axios';
import { location } from './location';

// Function to fetch nearby airports
export const fetchNearbyAirports = async () => {
  try {
    // Fetch location
    const loc = await location();

    // Ensure loc has required properties
    if (!loc || !loc.latitude || !loc.longitude) {
      throw new Error('Location data is incomplete.');
    }

    // Set up request options
    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports',
      params: {
        lat: loc.latitude, // Use correct property names from `location` data
        lng: loc.longitude,
        locale: 'en-US',
      },
      headers: {
        'x-rapidapi-key': '5841d31306mshd584616491a17f5p1a7959jsn72bc36477ff6',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    // Make the API request
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby airports:', error);
  }
};

export const searchAirports = async () => {
  const options = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
    params: {
      query: 'new',
      locale: 'en-US',
    },
    headers: {
      'x-rapidapi-key': '5841d31306mshd584616491a17f5p1a7959jsn72bc36477ff6',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
