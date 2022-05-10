import { useEffect, useState } from "react";
import styles from "./Weather.module.css";

const Weather = () => {
  const API_URL = process.env.REACT_APP_WEATHER_API;
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [city, setCity] = useState();
  const onGeoSucces = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const onGeoError = () => {
    alert("Error. Can't find your position");
  };
  const getWeather = async () => {
    const url = `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    setWeather(json.weather[0].main);
    setTemp(json.main.temp);
    setCity(json.name);
  };
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(onGeoSucces, onGeoError);
  };
  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    if (latitude && longitude) {
      getWeather();
    }
  }, [latitude]);
  return (
    <div className={styles.container}>
      <span className={styles.city}>{city ? city : "Loading..."}</span>
      <span className={styles.weather}>{weather ? weather : null}</span>
      <span className={styles.temp}>{temp ? `${temp}°C` : null}</span>
    </div>
  );
};

export default Weather;
