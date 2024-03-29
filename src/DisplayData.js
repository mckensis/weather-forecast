import { Today } from "./Dates";
import Location from './images/locationx24.png';

const BASE_ICON_URL = 'https://openweathermap.org/img/wn/';

//Displays the weather on the page
function DisplayWeather(weather) {
    const section = document.querySelector('.weatherDisplay');
    const header = document.createElement('h2');
    const forecast = document.createElement('p');
    const temp = document.createElement('p');
    const icon = document.createElement('img');
    const details = document.createElement('div');
    const location = document.createElement('img');
    const top = document.createElement('div');
    const time = document.createElement('p');
    let unit = '°C';

    //Set the content of the elements based on the data passed in 
    time.textContent = weather.time;
    location.src = Location;
    header.textContent = `${weather.city}, ${weather.country}`;
    forecast.textContent = weather.weather;
    temp.textContent = `${weather.temperature}${unit}`;
    icon.src = `${BASE_ICON_URL}${weather.icon}@2x.png`;
    icon.title = weather.textContent;

    details.classList.add('details');
    top.classList.add('heading');
    
    top.appendChild(location);
    top.appendChild(header);
    top.appendChild(time);
    
    details.appendChild(forecast);
    details.appendChild(icon);
    details.appendChild(temp);
    
    section.appendChild(top)
    section.appendChild(details);
}

//Displays the forecast on the page
function DisplayForecast(forecast) {
    const later = document.querySelector('.laterDisplay');
    const tomorrow = document.querySelector('.tomorrowDisplay');
    let parent;

    for (const key in forecast) {
        //Make sure we are appending the forecast data to the correct section
        if (forecast[key].date === Today()) {
            parent = later;
        } else {
            parent = tomorrow;
        
        }

        //For each item in the forecast,
        //Create the appropriate elements and append them to the page
        forecast[key].forEach(item => {
            const div = document.createElement('div');
            const forecast = document.createElement('p');
            const temp = document.createElement('p');
            const icon = document.createElement('img');
            const time = document.createElement('p');
            forecast.textContent = item.weather;
            temp.textContent = `${item.temperature} °C`;
            icon.src = `${BASE_ICON_URL}${item.icon}.png`;
            time.textContent = item.time;
            icon.title = item.textContent;
            div.classList.add('weatherItemLater');
            div.appendChild(time);
            div.appendChild(forecast);
            div.appendChild(temp);
            div.appendChild(icon);
            parent.appendChild(div);
            
            //Append a horizontal line if it's not the last item
            if (time.textContent !== "21:00") {
                const hr = document.createElement('hr');
                parent.appendChild(hr);
            };
        })
    }
}

export { DisplayWeather, DisplayForecast };