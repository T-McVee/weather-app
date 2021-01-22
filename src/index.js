import './css/main.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { getWeather, getTime, getIcon } from './logic';

// DOM Cache
const content = document.querySelector('#content');
const weatherDisplay = document.querySelector('.weather-display-section');
const weatherIcon = document.querySelector('#weather-icon');
const currentTempDisplay = document.querySelector('#current-temp-display');
const minTempDisplay = document.querySelector('#min-temp-display');
const maxTempDisplay = document.querySelector('#max-temp-display');
const locationDisplay = document.querySelector('#location-display');
const timeDisplay = document.querySelector('#time-display');
const searchForm = document.querySelector('form');
const searchBar = document.querySelector('#search-bar');

// Weather button Popover
const weatherButton = document.querySelector('[data-bs-toggle="popover"]');
const weatherButtonPopover = (() =>
  new Popover(weatherButton, {
    title: 'Popover Title',
    content: 'Body content here.',
    trigger: 'focus',
  }))();

const updateDisplay = (data) => {
  weatherIcon.src = getIcon(data);
  currentTempDisplay.textContent = `${Math.round(data.main.temp)}\u2103`;
  minTempDisplay.textContent = Math.round(data.main.temp_min);
  maxTempDisplay.textContent = Math.round(data.main.temp_max);
  locationDisplay.textContent = data.name;

  timeDisplay.textContent = getTime(data);
  setInterval(() => timeDisplay.textContent = getTime(data), 60000);

  weatherDisplay.style.animation = 'fadeNdrop 0.8s 1 forwards';
  weatherIcon.style.animation = 'fadeNdrop 0.8s';
};

const processData = async (func) => {
  try {
    const weather = await func;
    updateDisplay(weather);
  } catch (err) {
    if (err)
      locationDisplay.textContent = `${searchBar.value} is not a valid location`;
  } finally {
    searchForm.reset();
  }
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  processData(getWeather(searchBar.value, 'metric'));
});
