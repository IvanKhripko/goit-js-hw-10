import '../src/css/styles.css';
import countryCardTpl from '../src/templates/country-card.hbs';
import Countries from '../src/js/fetchCountries';
import getRefs from '../src/js/get-refs';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  let inputValue = event.target.value;

  console.log(inputValue.trim());
  if (!inputValue.trim()) {
    clearCountryCard();
    return;
  }

  Countries.fetchCountries(inputValue.trim()).then(renderCountryCard).catch(onFatchError);
}

function renderCountryCard(country) {
  console.log(country);
  const markup = countryCardTpl(country);
  refs.countryContainer.insertAdjacentHTML('beforeend', markup);
}

function onFatchError(error) {
  alert('error');
}

function clearCountryCard() {
  refs.countryContainer.innerHTML = '';
}
