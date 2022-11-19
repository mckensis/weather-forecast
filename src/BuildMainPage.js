function BuildLaterSection() {
  const section = document.createElement('section');
  const header = document.createElement('h2');

  header.textContent = "Later today";
  section.classList.add('later');

  section.appendChild(header);

  return section;
}

function BuildMainPage() {
  const body = document.querySelector('body');
  const container = document.createElement('section');
  container.classList.add('weatherDisplay');
  body.appendChild(container);
  body.appendChild(BuildLaterSection());
}

export default BuildMainPage;