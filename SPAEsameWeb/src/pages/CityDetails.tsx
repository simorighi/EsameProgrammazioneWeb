import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentWeatherByCity, type WeatherData } from "../utils/weatherApi";
import { useFavorites } from "../hooks/useFavorites";

function CityDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const cityParam = params.cityName;
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!cityParam) return;
    const fetchDetails = async () => {
      setLoading(true);
      const city = decodeURIComponent(cityParam);
      const res = await getCurrentWeatherByCity(city);
      setData(res);
      setFavorite(isFavorite(city));
      setLoading(false);
    };
    fetchDetails();
  }, [cityParam, isFavorite]);

  const handleToggleFavorite = () => {
    if (!data) return;
    if (favorite) {
      removeFavorite(data.cityName);
      setFavorite(false);
    } else {
      addFavorite(data);
      setFavorite(true);
    }
  };

  return (
    <div className="container-fluid bg-black py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-link" onClick={() => navigate(-1)}>← Torna</button>
        {data && (
          <button
            className={`btn ${favorite ? "btn-danger" : "btn-outline-danger"}`}
            onClick={handleToggleFavorite}
          >
            {favorite ? "❤️ Rimuovi dai preferiti" : "🤍 Aggiungi ai preferiti"}
          </button>
        )}
      </div>
      {!cityParam ? (
        <p>Città non specificata</p>
      ) : loading ? (
        <p>Caricamento...</p>
      ) : data ? (
        <div className="text-white">
          <h1>{data.cityName}</h1>
          <img src={data.weatherIconUrl} alt={data.description} />
          <p>Temperatura: {data.temperature}°C (percepita {data.feelsLike}°C)</p>
          <p>Min / Max: {data.tempMin}°C / {data.tempMax}°C</p>
          <p>Descrizione: {data.description}</p>
          <p>Umidità: {data.humidity}%</p>
          <p>Vento: {data.windSpeed} km/h</p>
          <p>Pressione: {data.pressure} hPa</p>
          <p>Coordinate: {data.lat}, {data.lon}</p>
        </div>
      ) : (
        <p>Impossibile recuperare i dati per {decodeURIComponent(cityParam || "")}</p>
      )}
    </div>
  );
}

export default CityDetails;