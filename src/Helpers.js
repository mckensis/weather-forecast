function ClearElements() {
    
    const weather = document.querySelector('.weatherDisplay');
    const later = document.querySelector('.laterDisplay');
    const tomorrow = document.querySelector('.tomorrowDisplay');

    RemoveChildren(weather);
    RemoveChildren(later);
    RemoveChildren(tomorrow);
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

function DisplayError() {
    const input = document.querySelector('.searchBar');
    input.setCustomValidity('Please Enter a valid location');
    input.reportValidity();
}

export { ClearElements, RemoveChildren, DisplayError };