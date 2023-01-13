import { ClearElements, DisplayError } from "./Helpers";
import { GetWeather, GetForecast, ConvertLocationIntoLatLon } from "./APIFunctions";
import { DisplayWeather, DisplayForecast } from './DisplayData';

async function Search() {
    const input = document.querySelector('.searchBar');
    input.setCustomValidity('');

    //If the user didn't input a location, ask for one
    if (!input.value) {
        input.placeholder = 'Please enter a valid location';
        input.style.border = '2px solid red';
        return;
    }

    try {
        //Convert the location name into coordinates
        const coordinates = await ConvertLocationIntoLatLon(input.value);    
        //If there are no coordinates available then let the user know
        if (!coordinates) {
            input.value = '';
            input.placeholder = 'Please enter a valid location';
            input.style.border = '2px solid red';
            return;
        }

        //Clear the currently displayed weather
        ClearElements();

        //Get the weather and forecast for the search location
        let weather = await GetWeather(coordinates);
        let forecast = await GetForecast(coordinates);

        //Display the weather and forecast for the location
        DisplayWeather(weather);
        DisplayForecast(forecast);
        
        //Reset the input styles and content
        input.value = '';
        input.style.border = 'none';
        input.blur();

    } catch (error) {
        DisplayError('Search', error);
        return;
    }
}

export default Search;