//Called by the Search function
//Removes the current weather from each section, to prepare for displaying the searched location's weather
function ClearElements() {
    const weather = document.querySelector('.weatherDisplay');
    const later = document.querySelector('.laterDisplay');
    const tomorrow = document.querySelector('.tomorrowDisplay');

    RemoveChildren(weather);
    RemoveChildren(later);
    RemoveChildren(tomorrow);
}

//Called by ClearElements to remove the previous location's data
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

//Will display errors to the user if there is a problem with the API calls
function DisplayError(source, error) {

    console.log(error);
    let parent = document.querySelector('.weatherDisplay');

    switch (source) {
        case 'GetWeather':
            parent.textContent = 'Error while retrieving current weather from API';
            break;
        case 'GetForecast':
            parent = document.querySelector('.laterDisplay');
            parent.textContent = 'Error while retrieving current forecast from API';
            break;
        case 'ConvertLocationIntoLatLon':
            parent.textContent = 'Error while converting location name into coordinates';
            break;
        case 'Search':
            parent.textContent = 'Error while searching';
            break;
    }
}

export { ClearElements, RemoveChildren, DisplayError };