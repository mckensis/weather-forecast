import { Today, Tomorrow, GetTime } from "./Dates";

//Takes the JSON response from the OpenWeather current weather API and returns the data we will be displaying
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

//Takes the JSON response from the OpenWeather 3 hour / 5 day forecast API and extracts the data we require
function ConvertJSONIntoForecastData(json) {
    
    const today = Today();
    const tomorrow = Tomorrow();

    //Create empty arrays which will be populated with valid data
    let forecastLater = [];
    let forecastTomorrow = [];
    
    for (const item of json.list) {
        let forecastDate = item.dt_txt.split(" ");
        
        //If the forecast is for today
        if (forecastDate[0] === today) {
            //Add weather, temperature, icon, and time of that specific forecast item into our forecastLater array
            forecastLater[forecastLater.length] = {
                weather: item.weather[0].main, 
                temperature: Math.round(item.main.temp * 10) / 10, 
                icon: item.weather[0].icon,
                time: forecastDate[1].substring(0, forecastDate[1].length - 3),
            };
            //Grab today's date
            forecastLater.date = forecastDate[0];
        }

        //If the forecast is for tomorrow
        if (forecastDate[0] === tomorrow) {
            //Add weather, temperature, icon, and time of that specific forecast item into our forecastTomorrow array
            forecastTomorrow[forecastTomorrow.length] = {
                weather: item.weather[0].main,
                temperature: Math.round(item.main.temp * 10) / 10,
                icon: item.weather[0].icon,
                time: forecastDate[1].substring(0, forecastDate[1].length - 3),
            };
            //Grab tomorrow's date
            forecastTomorrow.date = forecastDate[0];
        }
    }
    return { forecastLater, forecastTomorrow };
}

export { ConvertJSONIntoWeatherData, ConvertJSONIntoForecastData };