import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import type { WeatherData } from "../utils/weatherApi";

function Favorites() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();

  const handleViewDetails = (cityName: string) => {
    navigate(`/city/${encodeURIComponent(cityName)}`);
  };

  return (
    <div className="container-fluid bg-black py-5">
      <div className="container">
        <h1 className="text-white mb-5">Le mie città preferite</h1>
        {favorites.length === 0 ? (
          <p className="text-white text-center">Nessuna città nei preferiti</p>
        ) : (
          <div className="row">
            {favorites.map((city: WeatherData) => (
              <div className="col-md-4 mb-4" key={city.cityName}>
                <div className="card border-2 border-white rounded-0 bg-dark text-white h-100">
                  <div className="card-body">
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
                    <div className="text-center mb-3">
                      <img
                        src={city.weatherIconUrl}
                        alt={city.description}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </div>
                    <p className="text-center fs-4 mb-2">{city.temperature}°C</p>
                    <p className="text-muted text-capitalize mb-3">{city.description}</p>
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