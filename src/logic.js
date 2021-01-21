import { format } from 'date-fns';

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
  const url = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return url;
};

const updateImg = (image, url) => {
  console.log(image);
  
  image.src = url;
};

export { getTime, getIcon, updateImg };
