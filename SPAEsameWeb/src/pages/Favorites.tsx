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
    // MODIFICA: min-vh-100 assicura che lo sfondo nero copra tutto lo schermo
    // py-3 su mobile, py-md-5 su desktop
    <div className="container-fluid bg-black py-3 py-md-5 min-vh-100">
      <div className="container">
        
        {/* MODIFICA: Titolo centrato su mobile, a sinistra su desktop */}
        <h1 className="text-white mb-4 mb-md-5 text-center text-md-start">
          <strong>Le mie città preferite</strong>
        </h1>

        {/* Se non ci sono preferiti mostra un messaggio, altrimenti la lista */}
        {favorites.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            <p className="text-white text-center fs-3">
              Nessuna città nei preferiti
            </p>
          </div>
        ) : (
          /* MODIFICA: g-4 aggiunge spazio uniforme tra le colonne e le righe */
          <div className="row g-4">
            {favorites.map((city: WeatherData) => (
              /* MODIFICA: 
                 col-12: 1 per riga su mobile
                 col-sm-6: 2 per riga su tablet piccoli
                 col-lg-4: 3 per riga su desktop
              */
              <div className="col-12 col-sm-6 col-lg-4" key={city.cityName}>
                <div className="card border-2 border-white rounded-0 bg-dark text-white h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">

                    {/* Intestazione card con nome città e bottone rimozione */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0 fs-4 text-truncate" title={city.cityName}>
                        {city.cityName}
                      </h5>
                      <button
                        className="btn btn-sm btn-outline-danger border-0"
                        onClick={(e) => {
                           e.stopPropagation(); // Evita click accidentali sulla card se mai aggiungessi un click globale
                           removeFavorite(city.cityName);
                        }}
                        title="Rimuovi dai preferiti"
                        style={{ lineHeight: 1 }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Icona meteo e contenuto centrato */}
                    <div className="text-center mb-3 flex-grow-1">
                      <img
                        src={city.weatherIconUrl}
                        alt={city.description}
                        className="img-fluid"
                        style={{ maxHeight: "80px", width: "auto" }}
                      />
                      <p className="display-6 fw-bold my-2">
                        {Math.round(city.temperature)}°C
                      </p>
                      <p className="text-secondary text-capitalize mb-0">
                        {city.description}
                      </p>
                    </div>

                    {/* Bottone per aprire i dettagli della città */}
                    {/* mt-auto spinge il bottone sempre in fondo alla card */}
                    <button
                      className="btn btn-primary w-100 mt-auto"
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