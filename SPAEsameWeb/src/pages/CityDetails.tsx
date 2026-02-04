import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentWeatherByCity, type WeatherData } from "../utils/weatherApi";
import { useFavorites } from "../hooks/useFavorites";
import CardInfo from "../components/componentsReusable/CardInfo";

function CityDetails() {
  // Hook di React Router per leggere parametri URL e navigare tra le pagine
  const params = useParams();
  const navigate = useNavigate();
  const cityParam = params.cityName;

  // Stati per dati meteo, caricamento e preferiti
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(false);

  // Effetto che carica i dati meteo quando cambia la città nell'URL
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

  // Gestisce l'aggiunta o rimozione della città dai preferiti
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
    <div
      className="container-fluid bg-black py-4 justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-secondary botrder border-white"
          onClick={() => navigate(-1)}
        >
          ← Torna
        </button>

        {data && (
          <button
            className={`btn ${favorite ? "btn-danger" : "btn-outline-danger"}`}
            onClick={handleToggleFavorite}
          >
            {favorite ? "❤️ Rimuovi dai preferiti" : "🤍 Aggiungi ai preferiti"}
          </button>
        )}
      </div>

      {/* Rendering condizionale in base allo stato dell'applicazione */}
      {!cityParam ? (
        <p>Città non specificata</p>
      ) : loading ? (
        <p>Caricamento...</p>
      ) : data ? (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <CardInfo cityData={data} />
          </div>
        </div>
      ) : (
        <p>
          Impossibile recuperare i dati per{" "}
          {decodeURIComponent(cityParam || "")}
        </p>
      )}
    </div>
  );
}

export default CityDetails;
