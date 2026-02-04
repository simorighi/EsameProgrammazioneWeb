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
    // MODIFICA: Container flex che copre tutto lo schermo e gestisce il padding
    <div
      className="container-fluid bg-black d-flex flex-column p-3 p-md-5"
      style={{ minHeight: "100vh" }}
    >
      {/* Intestazione con bottoni */}
      {/* MODIFICA: flex-column su mobile (bottoni impilati), flex-sm-row da tablet in su */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <button
          className="btn btn-secondary border border-white w-100 w-sm-auto"
          onClick={() => navigate(-1)}
        >
          ← Torna
        </button>

        {data && (
          <button
            className={`btn ${favorite ? "btn-danger" : "btn-outline-danger"} w-100 w-sm-auto`}
            onClick={handleToggleFavorite}
          >
            {favorite ? "❤️ Rimuovi dai preferiti" : "🤍 Aggiungi ai preferiti"}
          </button>
        )}
      </div>

      {/* Contenuto principale centrato verticalmente grazie a flex-grow-1 */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center w-100">
        
        {/* Rendering condizionale in base allo stato dell'applicazione */}
        {!cityParam ? (
          <p className="text-white text-center fs-4">Città non specificata</p>
        ) : loading ? (
          <div className="text-center text-white">
            <div className="spinner-border text-light mb-3" role="status">
                <span className="visually-hidden">Caricamento...</span>
            </div>
            <p className="fs-4">Caricamento...</p>
          </div>
        ) : data ? (
          <div className="row justify-content-center w-100 m-0">
            {/* MODIFICA: La card occupa tutto su mobile, ma si restringe su desktop per eleganza */}
            <div className="col-12 col-md-8 col-lg-6">
              {/* Nota: Assumo che CardInfo qui accetti 'cityData'. 
                  Se CardInfo è stato creato per accettare 'title' e 'subtitle' come nella Home,
                  potresti dover adattare le props qui o usare un componente diverso. */}
              <CardInfo cityData={data} />
            </div>
          </div>
        ) : (
          <p className="text-white text-center fs-4">
            Impossibile recuperare i dati per{" "}
            {decodeURIComponent(cityParam || "")}
          </p>
        )}
      </div>
    </div>
  );
}

export default CityDetails;