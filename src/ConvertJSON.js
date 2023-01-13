import { Today, Tomorrow, GetTime } from "./Dates";

//Takes the JSON response from the OpenWeather API and returns the required data
function ConvertJSONIntoWeatherData(data) {
    let city = data.name;
    let country = data.sys.country;
    let timezone = data.timezone;
    let time = GetTime(timezone);
    let weather = data.weather[0].main;
    let temperature = Math.round(data.main.temp * 10 / 10);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;

    //Return what we need from the json data
    return {
        city,
        country,
        time,
        weather,
        temperature,
        description,
        icon,
    };
}

function ConvertJSONIntoForecastData(json) {
    
    const today = Today();
    const tomorrow = Tomorrow();

    let forecastLater = [];
    let forecastTomorrow = [];
    
    for (const item of json.list) {
        let forecastDate = item.dt_txt.split(" ");
        //If the forecast is still for the current day, append data to the "Later" section
        if (forecastDate[0] === today) {
            forecastLater[forecastLater.length] = {
                weather: item.weather[0].main, 
                temperature: Math.round(item.main.temp * 10) / 10, 
                icon: item.weather[0].icon,
                time: forecastDate[1].substring(0, forecastDate[1].length - 3),
            };
            forecastLater.date = forecastDate[0];
        }
        if (forecastDate[0] === tomorrow) {
            forecastTomorrow[forecastTomorrow.length] = {
                weather: item.weather[0].main,
                temperature: Math.round(item.main.temp * 10) / 10,
                icon: item.weather[0].icon,
                time: forecastDate[1].substring(0, forecastDate[1].length - 3),
            };
            forecastTomorrow.date = forecastDate[0];
        }
    }
    return { forecastLater, forecastTomorrow };
}

export { ConvertJSONIntoWeatherData, ConvertJSONIntoForecastData };