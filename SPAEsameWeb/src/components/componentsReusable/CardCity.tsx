import { useState } from "react";
import NavigationButton from "./Button";

interface CardCityProps {
  cityName: string;
  temperature: number;
  weatherIconUrl: string;
  onDetailsClick?: () => void;
  onFavoriteToggle?: (isFavorite: boolean) => void;
}

function CardCity(props: CardCityProps) {
  const {
    cityName,
    temperature,
    weatherIconUrl,
    onDetailsClick,
    onFavoriteToggle,
  } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onFavoriteToggle) {
      onFavoriteToggle(newState);
    }
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
                color: isFavorite ? "#FF1744" : "#ffffff",
              }}
              title={
                isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
              }
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <h5 className="card-title text-white" style={{ margin: 0 }}>
            {cityName}
          </h5>

          {/* Icona meteo */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img
              src={weatherIconUrl}
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
            {temperature}°C
          </p>

          {/* Bottone dettagli */}
          <div style={{ marginTop: "1rem" }} onClick={onDetailsClick}>
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
