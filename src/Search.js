import { ClearElements } from "./Helpers";
import { GetWeather, GetForecast } from "./APIFunctions";
import { DisplayWeather, DisplayForecast } from './DisplayData';
import ConvertLocationIntoLatLon from "./ConvertLocationIntoLatLon";

async function Search() {
    const input = document.querySelector('.searchBar');
    input.setCustomValidity('');

    if (!input.value) {
        input.placeholder = 'Please enter a valid location';
        input.style.border = '2px solid red';
        return;
    }

    try {
        const coordinates = await ConvertLocationIntoLatLon(input.value);    
        if (!coordinates) {
            input.value = '';
            input.placeholder = 'Please enter a valid location';
            input.style.border = '2px solid red';
            return;
        }

        ClearElements();

        let weather = await GetWeather(coordinates);
        let forecast = await GetForecast(coordinates);

        DisplayWeather(weather);
        DisplayForecast(forecast);        
        input.value = ''
        input.style.border = 'none';
        input.blur();
    } catch (error) {
        console.log(error);
        return;
    }
}

export default Search;