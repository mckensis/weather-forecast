function Search() {
    const form = document.createElement('form');
    const input = document.createElement('input');

    form.action = '';
    input.type = 'search';
    input.placeholder = 'Enter a location here...'
    
    input.classList.add('searchBar');
    
    form.appendChild(input);
    
    return form;
}

function BuildTomorrowSection() {
    const section = document.createElement('section');
    const header = document.createElement('h2');

    header.textContent = "Tomorrow";
    
    section.classList.add('tomorrowDisplay');

    section.appendChild(header);

    return section;
}

function BuildLaterSection() {
  const section = document.createElement('section');
  const header = document.createElement('h2');

  header.textContent = "Later";
  
  section.classList.add('laterDisplay');

  section.appendChild(header);

  return section;
}

function BuildMainPage() {
  const body = document.querySelector('body');
  const weatherDisplay = document.createElement('section');
  
  weatherDisplay.classList.add('weatherDisplay');
  
  body.appendChild(Search());
  body.appendChild(weatherDisplay);
  body.appendChild(BuildLaterSection());
  body.appendChild(BuildTomorrowSection());
}

export default BuildMainPage;