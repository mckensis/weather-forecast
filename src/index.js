import './style.css';
import BuildMainPage from './BuildMainPage';
import ConvertLocationIntoLatLon from './ConvertLocationIntoLatLon';
import { Today, Tomorrow } from './Dates';
import Location from './images/locationx24.png';

const BASE_FETCH_URL = 'https://api.openweathermap.org/data/2.5/';
const BASE_ICON_URL = 'https://openweathermap.org/img/wn/';
const API_KEY = 'ba42e21e7e100243ba7f54f3efcbc7eb';
const CELCIUS = '&units=metric';
const FAHRENHEIT = '&units=imperial';
let unit = CELCIUS;

window.addEventListener('load', BuildMainPage);
window.addEventListener('load', Initialise);
window.addEventListener('load', SubmitForm);

function SubmitForm() {
    document.querySelector('form').addEventListener("submit", (e) => {
        e.preventDefault();
        Search();
    });
}

//This function will display Glasgow's weather as default when the page is loaded
async function Initialise() {
    //ConvertLocationIntoLatLon returns latitude / longitude for a passed in variable. These are stored in the coordinates object
    const coordinates = await ConvertLocationIntoLatLon('Glasgow');
    unit = CELCIUS;
    //Display today's weather
    GetTodayWeather(coordinates, unit);
    //Display the forecast for later on today
    GetLaterForecast(coordinates, unit);
}

function DisplayError() {
    const input = document.querySelector('.searchBar');
    input.setCustomValidity('Please Enter a valid location');
    input.reportValidity();
}

async function Search() {
    const input = document.querySelector('.searchBar');
    if (!input.value) {
        return;
    }

    try {
        const coordinates = await ConvertLocationIntoLatLon(input.value);    
        if (!coordinates) {
            return;
        }

        ClearElements();
        GetTodayWeather(coordinates, unit);
        GetLaterForecast(coordinates, unit);
        input.value = ''
        input.blur();
    } catch (error) {
        console.log(error);
        return;
    }
}


function RemoveChildren(section) {
    if (!section.classList.contains('weatherDisplay')) {
        while (section.children.length > 1) {
            section.removeChild(section.lastChild);
        }        
    } else {
        while (section.hasChildNodes()) {
            section.removeChild(section.lastChild);
        }
    }
}

function ClearElements() {
    
    const weather = document.querySelector('.weatherDisplay');
    const later = document.querySelector('.laterDisplay');
    const tomorrow = document.querySelector('.tomorrowDisplay');

    RemoveChildren(weather);
    RemoveChildren(later);
    RemoveChildren(tomorrow);
}

//Converts the time to the time when the weather api was called,
//Also takes into consideration the time zone for the location
function ConvertUnixTime(data) {
    let localTime = data.time + data.timezone;
    let time = new Date(localTime * 1000).toLocaleString();
    let split = time.split(" ");
    //Remove the seconds from the time so that its just HH:MM
    split = split[1].substring(0, split[1].length -3);
    console.log(split);
    return split;
}

function CreateElements(data) {
    const section = document.querySelector('.weatherDisplay');
    const header = document.createElement('h2');
    const weather = document.createElement('p');
    const temp = document.createElement('p');
    const icon = document.createElement('img');
    const details = document.createElement('div');
    const location = document.createElement('img');
    const top = document.createElement('div');
    const time = document.createElement('p');
    let unit;

    let weatherTime = ConvertUnixTime(data);
    console.log(weatherTime);

    if (data.unit.includes("imperial")) {
        unit = '℉';
    } else {
        unit = '℃';
    }

    time.textContent = weatherTime;
    location.src = Location;
    header.textContent = data.city;
    weather.textContent = data.weather;
    temp.textContent = `${data.temperature}${unit}`;
    icon.src = `${BASE_ICON_URL}${data.icon}@2x.png`;

    details.classList.add('details');
    top.classList.add('heading');
    
    top.appendChild(location);
    top.appendChild(header);
    top.appendChild(time);
    
    details.appendChild(weather);
    details.appendChild(icon);
    details.appendChild(temp);
    
    section.appendChild(top)
    section.appendChild(details);
}

function CreateTomorrowElements(data) {
    const section = document.querySelector('.tomorrowDisplay');

    const div = document.createElement('div');
    const weather = document.createElement('p');
    const temp = document.createElement('p');
    const icon = document.createElement('img');
    const time = document.createElement('p');

    weather.textContent = data.weather;
    temp.textContent = `${data.temperature} °C`;
    icon.src = `${BASE_ICON_URL}${data.icon}.png`;
    time.textContent = data.time;

    div.classList.add('weatherItemLater');

    div.appendChild(time);
    div.appendChild(weather);
    div.appendChild(temp);
    div.appendChild(icon);

    const hr = document.createElement('hr');

    section.appendChild(div);

    //Append a horizontal line 
    if (time.textContent !== "21:00") {
        section.appendChild(hr);
    }
}

function CreateLaterElements(data) {
    const section = document.querySelector('.laterDisplay');

    const div = document.createElement('div');
    const weather = document.createElement('p');
    const temp = document.createElement('p');
    const icon = document.createElement('img');
    const time = document.createElement('p');

    weather.textContent = data.weather;
    temp.textContent = `${data.temperature} °C`;
    icon.src = `${BASE_ICON_URL}${data.icon}.png`;
    time.textContent = data.time;

    div.classList.add('weatherItemLater');

    div.appendChild(time);
    div.appendChild(weather);
    div.appendChild(temp);
    div.appendChild(icon);

    const hr = document.createElement('hr');

    section.appendChild(div);

    //Append a horizontal line 
    if (time.textContent !== "21:00") {
        section.appendChild(hr);
    }
}

//Remove the Later section if there is no data for later today
function NoLaterData() {
    const section = document.querySelector('.laterDisplay');
    section.parentElement.removeChild(section);
}

async function GetTodayWeather(coordinates, unit) {
    try {
        let response = await fetch(`${BASE_FETCH_URL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}${unit}`);
        let json = await response.json();
        let city = json.name;
        let time = json.dt;
        let timezone = json.timezone;
        let weather = json.weather[0].main;
        let temperature = Math.round(json.main.temp * 10 / 10);
        let description = json.weather[0].description;
        let icon = json.weather[0].icon;
        console.log(json);
        CreateElements({ city, weather, temperature, description, icon, time, timezone, unit });
    } catch (error) {
        console.log(error);
        return;
    }
}

async function GetLaterForecast(coordinates, unit) {
    try {
        const response = await fetch(`${BASE_FETCH_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}${unit}`);
        const json = await response.json();

        for (const item of json.list) {
            let forecastDate = item.dt_txt.split(" ");
            //If the forecast is still for the current day, append data to the "Later" section
            if (forecastDate[0] === Today()) {
                const weather = item.weather[0].main;
                const temperature = Math.round(item.main.temp * 10) / 10;
                const icon = item.weather[0].icon;
                const time = forecastDate[1].substring(0, forecastDate[1].length - 3);
                CreateLaterElements({weather, temperature, icon, time});
                //If the forecast is for tomorrow, append data to the "Tomorrow" section
            } else if (forecastDate[0] === Tomorrow()) {
                //Do something with tomorrow's forecast data
                const weather = item.weather[0].main;
                const temperature = Math.round(item.main.temp * 10) / 10;
                const icon = item.weather[0].icon;
                const time = forecastDate[1].substring(0, forecastDate[1].length - 3);
                CreateTomorrowElements({weather, temperature, icon, time});
            }
        }
        const later = document.querySelector('.laterDisplay');
        if (later.children.length < 2) {
            NoLaterData();
        }
    } catch (error) {
        console.log(error);
        return;
    }
}