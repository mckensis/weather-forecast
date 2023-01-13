import { ConvertJSONIntoWeatherData, ConvertJSONIntoForecastData } from './ConvertJSON';
import { DisplayError } from './Helpers';

const BASE_FETCH_URL = 'https://api.openweathermap.org/data/2.5/';
const BASE_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const API_KEY = 'ba42e21e7e100243ba7f54f3efcbc7eb';

//Performs an API call for the current weather at the coordinates provided
async function GetWeather(coordinates) {
    try {
        let response = await fetch(`${BASE_FETCH_URL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`);
        let json = await response.json();
        //Extract data from the json which we want to display i.e. City name, weather, etc.
        let data = ConvertJSONIntoWeatherData(json);
        return data;
    } catch (error) {
        DisplayError('GetWeather', error);
        return;
    }
}

//Performs an API call for the 3 hour / 5 day forecast at the coordinates provided
async function GetForecast(coordinates) {
    try {
        let response = await fetch(`${BASE_FETCH_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`);
        let json = await response.json();
        //Extract data from the json with today / tomorrow's 3 hour forecast 
        let data = ConvertJSONIntoForecastData(json);
        return data;
    } catch (error) {
        DisplayError('GetForecast', error);
        return;
    }
}

//Uses the OpenWeather Geocoding API
//Converts the name of a location into lat/lon coordinates
async function ConvertLocationIntoLatLon(location) {
    try {
        const response = await fetch(`${BASE_GEO_URL}q=${location}&limit=1&appid=${API_KEY}`);
        const json = await response.json();
        //Create the coordinates object of the location which was passed in to be converted
        const coordinates = {
            lat: json[0].lat,
            lon: json[0].lon,
        }
        return coordinates;
    } catch (error) {
        DisplayError('ConvertLocationIntoLatLon', error);
        return;
    }
}

export { GetWeather, GetForecast, ConvertLocationIntoLatLon };