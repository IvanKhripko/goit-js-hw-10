import '../src/css/styles.css';
import countryCardTpl from '../src/templates/country-card.hbs';

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
  .then(responce => {
    // console.log(responce.json());
    return responce.json();
  })
  .then(countries => {
    console.log(countries);
    countries.map(country => {
      const markup = countryCardTpl(country);
      console.log(markup);
    });
  })
  .catch(error => {
    console.log(error);
  });
// console.log(result);
