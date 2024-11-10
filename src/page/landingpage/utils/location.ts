export const location = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
          reject(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      reject(new Error('Geolocation not supported'));
    }
  });
};

export const getIPLocation = async () => {
  try {
    const response = await fetch('https://ipinfo.io/json?token=07db14a4eef354');
    const data = await response.json();

    // Return the necessary location data to be used elsewhere
    return {
      Location: `${data.city}, ${data.region}, ${data.country}`,
      ip: data.ip,
    };
  } catch (error) {
    console.error('Error getting IP location: ', error);
    // Return a fallback or error message
    return {
      Location: 'Unknown',
      ip: null,
    };
  }
};
