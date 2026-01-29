import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "./Button";
import { useFavorites } from "../../hooks/useFavorites";
import type { WeatherData } from "../../utils/weatherApi";

interface CardCityProps {
  cityData: WeatherData;
}

function CardCity({ cityData }: CardCityProps) {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(cityData.cityName));
  }, [isFavorite, cityData.cityName]);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(cityData.cityName);
      setFavorite(false);
    } else {
      addFavorite(cityData);
      setFavorite(true);
    }
  };

  const handleDetailsClick = () => {
    navigate(`/city/${encodeURIComponent(cityData.cityName)}`);
  };

  return (
    <>
      <div className="card border-2 border-white rounded-0 bg-black">
        <div className="card-body bg-black">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "right",
              marginBottom: "1rem",
            }}
          >
            <button
              onClick={handleFavoriteClick}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: favorite ? "#FF1744" : "#ffffff",
              }}
              title={
                favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
              }
            >
              {favorite ? "❤️" : "🤍"}
            </button>
          </div>

          <h5 className="card-title text-white" style={{ margin: 0 }}>
            {cityData.cityName}
          </h5>

          {/* Icona meteo */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img
              src={cityData.weatherIconUrl}
              alt="Weather Icon"
              style={{ width: "60px", height: "60px" }}
            />
          </div>

          {/* Temperatura */}
          <p
            className="card-text text-white"
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              margin: "0.5rem 0",
            }}
          >
            {cityData.temperature}°C
          </p>

          {/* Bottone dettagli */}
          <div style={{ marginTop: "1rem" }} onClick={handleDetailsClick}>
            <NavigationButton
              colorBackground="#1b1717"
              borderColor="#ffffff"
              textColor="#ffffff"
              contentText="Vedi dettagli →"
              fontSize="fs-6"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCity;
