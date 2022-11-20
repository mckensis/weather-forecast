const BASE_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const API_KEY = 'ba42e21e7e100243ba7f54f3efcbc7eb';

async function ConvertLocationIntoLatLon(location) {
  try {
    const response = await fetch(`${BASE_GEO_URL}q=${location}&limit=1&appid=${API_KEY}`);
    const json = await response.json();
    const coordinates = {
      lat: json[0].lat,
      lon: json[0].lon
    };
    //Return the coordinates of the location which was passed in to be converted
    return coordinates
  } catch (error) {
    console.log(error);
    //TO-DO: do something with error
  }
}

export default ConvertLocationIntoLatLon;