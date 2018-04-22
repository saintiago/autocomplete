import suggestionsModel from './logic/suggestionsModel'

window.onload = function () {
  document.body.innerHTML = getLayout();

  const input = document.getElementById('inputField');
  const suggestionsWrapper = document.getElementById('suggestionsWrapper');
  suggestionsWrapper.style.display = 'none';
  input.addEventListener('input', (e) => inputHandler(e));
  input.addEventListener('focus', (e) => inputHandler(e));
  const handleKeyDown = createKeydownHandler();
  input.addEventListener('keydown', (e) => handleKeyDown(e));
  input.addEventListener('blur', hideSuggestions);

  const error = document.getElementById('error');
  error.style.display = 'none';
  error.addEventListener('click', () => {error.style.display = 'none';});

  const database = document.getElementById('database');
  database.value = suggestionsModel.getDatabase();

  const databaseButton = document.getElementById('updateDatabaseButton');
  databaseButton.addEventListener('click', updateDb);
};

function getLayout() {
  return'<div class="container">' +
    '  <h1>Autocomplete Vanilla</h1>' +
    '  <div class="input_field_wrapper">' +
    '    <input id="inputField" tabindex="1" class="input_field" type="text" placeholder="Start typing" value="">' +
    '    <ul class="suggestions_list" id="suggestionsWrapper"></ul>' +
    '  </div>' +
    '  <div>' +
    '    <h2>Database</h2>' +
    '    <textarea tabindex="2" class="database" id="database"></textarea>' +
    '    <button tabindex="3" class="update_database_button" id="updateDatabaseButton">Update database</button>' +
    '  </div>' +
    '  <div class="error" id="error"></div>' +
    '  <a class="back_link" href="/" title="Back to index page">Back to index page</a>' +
    '</div>';
}

function createKeydownHandler() {
  let hoverOn = 0;
  const suggestionsWrapper = document.getElementById('suggestionsWrapper');

  return function (e) {
    const suggestionsCount = suggestionsWrapper.childElementCount;
    switch (e.keyCode) {
      case 38: // up
        e.preventDefault();
        if (hoverOn > 0) {
          hoverOn--;
        }
        hoverItem(hoverOn);
        break;
      case 40: // down
        e.preventDefault();
        if (hoverOn < (suggestionsCount - 1)) {
          hoverOn++;
        }
        hoverItem(hoverOn);
        break;
      case 27: // esc
        e.preventDefault();
        hoverOn = 0;
        hideSuggestions();
        break;
      case 13: // enter
        e.preventDefault();
        hoverOn = 0;
        selectItem(getItemByIndex(hoverOn));
        break;
    }
  };

  function getItemByIndex(index) {
    let items = suggestionsWrapper.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
      if (i === index) {
        return items[i].innerText;
      }
    }
  }
}

function hoverItem(index) {
  let items = document.querySelectorAll('#suggestionsWrapper li');
  for (let i = 0; i < items.length; i++) {
    if (i === index) {
      items[i].classList.add('hover');
    } else {
      items[i].classList.remove('hover');
    }
  }
}

function inputHandler(e) {
  suggestionsModel.requestSuggestions(e.target.value)
    .then(
      suggestions => showSuggestions(suggestions),
      error => showError(error.message)
    );

  function showSuggestions(suggestions) {
    const suggestionsWrapper = document.getElementById('suggestionsWrapper');
    hideSuggestions();
    if (suggestions.length > 0) {
      suggestions.map((item, i) => {
        const li = document.createElement('li');
        li.innerText = item;
        li.addEventListener('mousedown', () => {selectItem(item)});
        suggestionsWrapper.appendChild(li);
      });
      suggestionsWrapper.style.display = 'block';
      hoverItem(0);
    }
  }
}

function selectItem(item) {
  if (typeof item !== 'undefined') {
    const input = document.getElementById('inputField');
    input.value = item;
    hideSuggestions();
  }
}

function hideSuggestions() {
  const suggestionsWrapper = document.getElementById('suggestionsWrapper');
  suggestionsWrapper.style.display = 'none';
  suggestionsWrapper.innerHTML = '';
}

function showError(errorText) {
  const error = document.getElementById('error');
  error.innerText = errorText;
  error.style.display = 'block';
}

function updateDb() {
  suggestionsModel.setDatabase(database.value);
}