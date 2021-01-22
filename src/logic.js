import { format } from 'date-fns';

const getWeather = async (city, units) => {
  const key = '43fe54a283fe2df1c8a82c947b7b6ac9';
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`,
    { mode: 'cors' },
  );

  const weather = await res.json();

  return weather;
};

const getTime = (weather) => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const destOffset = weather.timezone * 1000;
  const destTimeStamp = utc + destOffset;
  const destTime = format(new Date(destTimeStamp), 'h:mm bbbb');

  return destTime;
};

const getIcon = ({ weather }) => {
  return `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
};

export { getWeather, getTime, getIcon };
