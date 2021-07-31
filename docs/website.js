const weatheruser = document.querySelector('form');
const placename = document.querySelector('.error-msg');
weatheruser.addEventListener('submit', weathertemperature);
function weathertemperature(e) {
  e.preventDefault();
  gettemperature();
}
function gettemperature() {
  const weatherplace = document.querySelector('input[type="text"]');
  const place = weatherplace.value;
  gettemperatureinfo(place);
}
async function gettemperatureinfo(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
    {
      mode: 'cors',
    }
  );
  if (response.status === 400) {
    placename.style.display = 'block';
  } else {
    placename.style.display = 'none';
    const weathertemperatureinfo = await response.json();
    const anotherweatherinfo = getweatherinfo(weathertemperatureinfo);
    showweather(anotherweatherinfo);
    anotherweather();
  }
}

function getweatherinfo(weathertemperatureinfo) {
  const weatherinfo = {
    condition: weathertemperatureinfo.current.condition.text,
    feelsLike: {
      f: Math.round(weathertemperatureinfo.current.feelslike_f),
      c: Math.round(weathertemperatureinfo.current.feelslike_c),
    },
    currentTemp: {
      f: Math.round(weathertemperatureinfo.current.temp_f),
      c: Math.round(weathertemperatureinfo.current.temp_c),
    },
    wind: Math.round(weathertemperatureinfo.current.wind_mph),
    humidity: weathertemperatureinfo.current.humidity,
    location: weathertemperatureinfo.location.name.toUpperCase(),
  };
  if (weathertemperatureinfo.location.country !== 'United States of America') {
    weatherinfo['region'] = weathertemperatureinfo.location.country.toUpperCase();
  } else {
    weatherinfo['region'] = weathertemperatureinfo.location.region.toUpperCase();
  }
  return weatherinfo;
}
function showweather(anotherweatherinfo) {
  document.querySelector('.condition').textContent = anotherweatherinfo.condition;
  document.querySelector('.location').textContent = `${anotherweatherinfo.location}, ${anotherweatherinfo.region}`;
  document.querySelector('.degrees').textContent = anotherweatherinfo.currentTemp.f +' degrees';
  document.querySelector('.wind-mph').textContent = `The Amount of Wind is ${anotherweatherinfo.wind}  mph`;
  document.querySelector('.feels-like').textContent = `The Temperature is similar to ${anotherweatherinfo.feelsLike.f}` +' degrees';
  document.querySelector('.humidity').textContent = `The Amount of humidity is  ${anotherweatherinfo.humidity}` + ' percent';
}
function anotherweather() {
  weatheruser.reset();
}






