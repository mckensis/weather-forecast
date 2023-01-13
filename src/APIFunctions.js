import { ConvertJSONIntoWeatherData, ConvertJSONIntoForecastData } from './ConvertJSON';

const BASE_FETCH_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'ba42e21e7e100243ba7f54f3efcbc7eb';

//Performs an API call with the coordinates provides
async function GetWeather(coordinates) {
    try {
        let response = await fetch(`${BASE_FETCH_URL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`);
        let json = await response.json();
        let data = ConvertJSONIntoWeatherData(json);
        return data;
    } catch (error) {
        //DisplayError(error);
        console.log(error);
        return;
    }
}

async function GetForecast(coordinates) {
    try {
        let response = await fetch(`${BASE_FETCH_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`);
        let json = await response.json();
        let data = ConvertJSONIntoForecastData(json);
        return data;
    } catch (error) {
        //DisplayError(error);
        console.log(error);
        return;
    }
}

export { GetWeather, GetForecast };