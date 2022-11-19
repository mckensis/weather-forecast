import './style.css';
import BuildMainPage from './BuildMainPage';

const BASE_FETCH_URL = 'https://api.openweathermap.org/data/2.5/';
const BASE_ICON_URL = 'https://openweathermap.org/img/wn/';
const BASE_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const API_KEY = 'ba42e21e7e100243ba7f54f3efcbc7eb';
const CELCIUS = '&units=metric';
const FAHRENHEIT = '&units=imperial';

window.addEventListener('load', BuildMainPage);
window.addEventListener('load', Initialise);

function Initialise() {
  ConvertIntoLatLon('Glasgow');
}

//Returns today's date
function Today() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

//Returns tomorrow's date
function Tomorrow() {
  let date = new Date();
  let tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let day = tomorrow.getDate();
  let month = tomorrow.getMonth() + 1;
  let year = tomorrow.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

function CreateElements(data) {
  const section = document.querySelector('.weatherDisplay');
  const header = document.createElement('h2');
  const weather = document.createElement('p');
  const temp = document.createElement('p');
  const description = document.createElement('p');
  const icon = document.createElement('img');
  
  header.textContent = data.city;
  weather.textContent = data.weather;
  temp.textContent = `Currently ${data.temperature} °C`;
  description.textContent = data.description;
  icon.src = `${BASE_ICON_URL}${data.icon}@4x.png`;

  header.classList.add('city');
  weather.classList.add('weather');
  temp.classList.add('temperature');
  description.classList.add('description');
  icon.classList.add('weatherIcon');

  section.appendChild(header);
  section.appendChild(temp);
  section.appendChild(weather);
  section.appendChild(icon);
}

function CreateLaterElements(data) {
  const section = document.querySelector('.later');

  const div = document.createElement('div');
  const weather = document.createElement('p');
  const temp = document.createElement('p');
  const icon = document.createElement('img');
  const time = document.createElement('p');
  
  weather.textContent = data.weather;
  temp.textContent = `${data.temperature} °C`;
  icon.src = `${BASE_ICON_URL}${data.icon}.png`;
  time.textContent = data.time;

  weather.classList.add('weatherLater');
  temp.classList.add('temperatureLater');
  icon.classList.add('weatherIconLater');
  time.classList.add('timeLater');
  div.classList.add('laterDiv');

  div.appendChild(time);
  div.appendChild(weather);
  div.appendChild(icon);
  div.appendChild(temp);
  section.appendChild(div);
}

async function ConvertIntoLatLon(location) {
  try {
    const response = await fetch(`${BASE_GEO_URL}q=${location}&limit=1&appid=${API_KEY}`);
    const json = await response.json();
    //Call GetTodayWeather function with the latitude and longitude extracted from the promise returned from the Geocoding API.
    GetTodayWeather(json[0].lat, json[0].lon);
    GetNextForecast(json[0].lat, json[0].lon);
  } catch (error) {
    console.log(error);
    //TO-DO: do something with error
  }
}

async function GetTodayWeather(lat, lon) {
  try {
    const response = await fetch(`${BASE_FETCH_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}${CELCIUS}`);
    const json = await response.json();
    const city = json.name;
    const weather = json.weather[0].main;
    const temperature = Math.round(json.main.temp * 10 / 10);
    const description = json.weather[0].description;
    const icon = json.weather[0].icon;
    CreateElements({ city, weather, temperature, description, icon });
  } catch (error) {
    console.log(error);
  }
}

async function GetNextForecast(lat, lon) {
  try {
    const response = await fetch(`${BASE_FETCH_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}${CELCIUS}`);
    const json = await response.json();

    for (const item of json.list) {
      let forecastDate = item.dt_txt.split(" ");
      //If the forecast is still for the current day, append data to the "Later" section
      if (forecastDate[0] === Today()) {
        const weather = item.weather[0].main;
        const temperature = Math.round(item.main.temp * 10) / 10;
        const icon = item.weather[0].icon;
        const time = forecastDate[1].substring(0, forecastDate[1].length - 3)
        CreateLaterElements({weather, temperature, icon, time});
      //If the forecast is for tomorrow, append data to the "Tomorrow" section
      } else if (forecastDate[0] === Tomorrow()) {
        console.log(item);
      }
    }
      //there are 9 items in the list for each day
  } catch (error) {
    console.log(error);
  }
}