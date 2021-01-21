import './css/main.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { getTime, getIcon, updateImg } from './logic';
import { doc } from 'prettier';

// DOM Cache
const content = document.querySelector('#content');
const weatherIcon = document.querySelector('#weather-icon');
const currentTempOuput = document.querySelector('#current-temp-output');
const minTempOutput = document.querySelector('#min-temp-output');
const maxTempOutput = document.querySelector('#max-temp-output');
const locationOutput = document.querySelector('#location-output');
const timeOutput = document.querySelector('#time-output');
const searchForm = document.querySelector('form');
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');

// Weather button Popover
const weatherButton = document.querySelector('[data-bs-toggle="popover"]');
const weatherButtonPopover = (() =>
  new Popover(weatherButton, {
    title: 'Popover Title',
    content: 'Body content here.',
    trigger: 'focus',
  }))();

// API config
const apiKey = '43fe54a283fe2df1c8a82c947b7b6ac9';
const tempUnits = 'metric';

const getWeather = async (city, key) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${tempUnits}`,
    { mode: 'cors' },
  );

  const weather = await res.json();

  return weather;
};

const processData = async (func) => {
  try {
    const weather = await func;
    console.log(weather);

    currentTempOuput.textContent = Math.round(weather.main.temp);
    minTempOutput.textContent = Math.round(weather.main.temp_min);
    maxTempOutput.textContent = Math.round(weather.main.temp_max);
    locationOutput.textContent = weather.name;

    weatherIcon.src = getIcon(weather);
    timeOutput.textContent = getTime(weather);
    setInterval(() => timeOutput.textContent = getTime(weather), 60000);
  } catch (err) {
    if (err) locationOutput.textContent = `${searchBar.value} is not a valid location`;
    console.error(err);
  }
  searchForm.reset();
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  processData(getWeather(searchBar.value, apiKey));
});

