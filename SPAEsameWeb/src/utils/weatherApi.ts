const API_KEY = "01eba156d98ea1360e50576692a3a6e6";
/*
chiave api secondaria qual'ora la prima scadesse
const API_KEY = "" */

const BASE_URL = "https://api.openweathermap.org";

export interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  icon: string;
  weatherIconUrl: string;
  lat: number;
  lon: number;
}

/**
 * Recupera il meteo attuale di una città
 */
export const getCurrentWeatherByCity = async (cityName: string): Promise<WeatherData | null> => {
  try {
    // Step 1: Recupera le coordinate della città
    console.log("Cercando coordinate per:", cityName);
    const geoResponse = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoResponse.json();
    console.log("Risposta GEO:", geoData);

    if (!geoData || geoData.length === 0) {
      console.error(`Città "${cityName}" non trovata`);
      return null;
    }

    const { lat, lon } = geoData[0];
    console.log("Coordinate trovate:", lat, lon);

    // Step 2: Recupera il meteo usando le coordinate
    console.log("Cercando meteo per coordinate:", lat, lon);
    const weatherResponse = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`
    );
    const weatherData = await weatherResponse.json();
    console.log("Risposta WEATHER completa:", JSON.stringify(weatherData, null, 2));

    if (!weatherData || weatherData.cod !== 200) {
      console.error("Errore nel recupero dei dati meteo:", JSON.stringify(weatherData, null, 2));
      return null;
    }

    console.log("Dati meteo validi ricevuti!");
    return {
      cityName: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      tempMin: Math.round(weatherData.main.temp_min),
      tempMax: Math.round(weatherData.main.temp_max),
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Converte m/s in km/h
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].main,
      weatherIconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
      lat,
      lon,
    };
  } catch (error) {
    console.error("ERRORE nella chiamata API:", error);
    return null;
  }
};

/**
 * Recupera il meteo di più città
 */
export const getWeatherForMultipleCities = async (
  cityNames: string[]
): Promise<WeatherData[]> => {
  const results = await Promise.all(
    cityNames.map((city) => getCurrentWeatherByCity(city))
  );
  return results.filter((weather) => weather !== null) as WeatherData[];
};

/**
 * Recupera il meteo tramite coordinate
 */
export const getCurrentWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<WeatherData | null> => {
  try {
    console.log("🌤️ Cercando meteo per coordinate:", lat, lon);
    const weatherResponse = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`
    );
    const weatherData = await weatherResponse.json();
    console.log("🌤️ Risposta WEATHER:", JSON.stringify(weatherData, null, 2));

    if (!weatherData || weatherData.cod !== 200) {
      console.error("❌ Errore nel recupero dei dati meteo:", JSON.stringify(weatherData, null, 2));
      return null;
    }

    return {
      cityName: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      tempMin: Math.round(weatherData.main.temp_min),
      tempMax: Math.round(weatherData.main.temp_max),
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: Math.round(weatherData.wind.speed * 3.6),
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].main,
      weatherIconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
      lat,
      lon,
    };
  } catch (error) {
    console.error("❌ ERRORE nella chiamata API:", error);
    return null;
  }
};
