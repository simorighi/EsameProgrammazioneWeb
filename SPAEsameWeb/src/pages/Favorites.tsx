import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import type { WeatherData } from "../utils/weatherApi";

function Favorites() {
  // Hook per navigare tra le pagine e per accedere alla lista dei preferiti
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();

  // Porta alla pagina di dettaglio della città selezionata
  const handleViewDetails = (cityName: string) => {
    navigate(`/city/${encodeURIComponent(cityName)}`);
  };

  return (
    <div className="container-fluid bg-black py-5" style={{ minHeight: "80vh" }}>
      <div className="container">
        <h1 className="text-white mb-5">
          <strong>Le mie città preferite</strong>
        </h1>

        {/* Se non ci sono preferiti mostra un messaggio, altrimenti la lista */}
        {favorites.length === 0 ? (
          <p className="text-white text-center fs-3">
            Nessuna città nei preferiti
          </p>
        ) : (
          <div className="row">
            {favorites.map((city: WeatherData) => (
              <div className="col-md-4 mb-4" key={city.cityName}>
                <div className="card border-2 border-white rounded-0 bg-dark text-white h-100">
                  <div className="card-body">

                    {/* Intestazione card con nome città e bottone rimozione */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">{city.cityName}</h5>
                      <button
                        className="btn btn-sm btn-danger pe-2 pb-1"
                        onClick={() => removeFavorite(city.cityName)}
                        title="Rimuovi dai preferiti"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Icona meteo */}
                    <div className="text-center mb-3">
                      <img
                        src={city.weatherIconUrl}
                        alt={city.description}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </div>

                    {/* Informazioni principali sul meteo */}
                    <p className="text-center fs-4 mb-2">
                      {city.temperature}°C
                    </p>
                    <p className="text-muted text-capitalize mb-3">
                      {city.description}
                    </p>

                    {/* Bottone per aprire i dettagli della città */}
                    <button
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => handleViewDetails(city.cityName)}
                    >
                      Vedi dettagli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
