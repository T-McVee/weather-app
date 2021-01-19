import './css/main.css';
import { Tooltip, Toast, Popover } from 'bootstrap';

// DOM Cache
const content = document.querySelector('#content');

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
  } catch (err) {
    console.log(err);
  }
};

processData(getWeather('kelowna', apiKey));

/* const processData = async ({ weather, main }) => {
  const results = await { weather, main };

  return results;
}; */
