import './style.css';
import BuildMainPage from './BuildMainPage';
import Search from './Search';
import { DisplayWeather, DisplayForecast } from './DisplayData';
import { GetWeather, GetForecast } from './APIFunctions';
import ConvertLocationIntoLatLon from './ConvertLocationIntoLatLon';

window.addEventListener('load', BuildMainPage);
window.addEventListener('load', Initialise);

//This function will display Glasgow's weather as default when the page is loaded
async function Initialise() {
    //Event Listener for searching a city name
    document.querySelector('form').addEventListener("submit", (e) => {
        e.preventDefault();
        Search();
    });

    //Get Glasgow's current weather and 3hr forecast for today / tomorrow on page load
    const coordinates = await ConvertLocationIntoLatLon('Glasgow');
    let weather = await GetWeather(coordinates);
    let forecast = await GetForecast(coordinates);

    //Display Glasgow's weather and forecasts
    DisplayWeather(weather);
    DisplayForecast(forecast);
}