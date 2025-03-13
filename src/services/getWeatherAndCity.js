import { OPENWEATHER_KEY, OPENWEATHER_URL } from '../config';

export const getWeatherAndCity = async ({ lat, lng }) => {
  const FetchURL = `${OPENWEATHER_URL}?lat=${lat}&lon=${lng}&units=metric&appid=${OPENWEATHER_KEY}`;
  try {
    const res = await fetch(FetchURL);
    const data = await res.json();

    if (!res.ok) throw new Error();
    console.log('res', res);
    console.log('data');
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;
    const cityName = data.name;

    return {
      temp,
      weather,
      cityName
    };

  } catch {
    return false;
  }
};