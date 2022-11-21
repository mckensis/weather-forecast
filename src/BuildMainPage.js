function Search() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    //const button = document.createElement('button');

    input.type = 'search';
    input.placeholder = 'Enter a location here...'
    //button.type = "submit";
    //button.textContent = "searching";
    form.action = '';

    input.classList.add('searchBar');
    //button.classList.add('searchButton');

    form.appendChild(input);
    //form.appendChild(button);

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

  header.textContent = "Later Today";
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