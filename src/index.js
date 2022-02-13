import '../src/css/styles.css';

import getRefs from '../src/js/get-refs';
import Countries from '../src/js/fetchCountries';

import countriesListTpl from '../src/templates/countries-name.hbs';
import countryInfo from '../src/templates/contry-info.hbs';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

// Задержка выполнения функции после остановки ввода через: 300мс
const DEBOUNCE_DELAY = 300;

// Ссылки на (DOM - елементы) см. get-refs.js
const refs = getRefs();

// Слушатель выполнения инпута
refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// Функция выполнения инпута
function onSearch(event) {
  let inputValue = event.target.value.trim();
  clearCountryCard();

  // При пустом инпуте
  if (!inputValue) {
    Notify.info('Enter the name of the country');
    return;
  }

  // Запрос значения инпута на сервере
  Countries.fetchCountries(inputValue).then(renderCountryCard).catch(onFatchError);
}

// Разметка ответов сервера
function renderCountryCard(country) {
  // Рендер разметки списка стран
  if (country.length >= 2 && country.length <= 10) {
    clearCountryCard();

    const markupCountriesList = countriesListTpl(country);
    refs.countriesList.insertAdjacentHTML('beforeend', markupCountriesList);
  } else if (country.length === 1) {
    // Рендер разметки инфо о стране
    clearCountryCard();

    const markupCountryInfo = countryInfo(country);
    refs.countryContainer.insertAdjacentHTML('beforeend', markupCountryInfo);
  } else {
    // Сообщение в случае ответа больше 10 стран
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

// Сообщение, при 404 ответе
function onFatchError(error) {
  Notify.failure('Oops, there is no country with that name');
}

// Очистка контейнера и списка
function clearCountryCard() {
  refs.countryContainer.innerHTML = '';
  refs.countriesList.innerHTML = '';
}
