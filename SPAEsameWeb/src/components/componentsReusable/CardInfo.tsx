import { type WeatherData } from "../../utils/weatherApi";

interface CardInfoProps {
  title?: string;
  subtitle?: string;
  cityData?: WeatherData | null;
}

function CardInfo(props: CardInfoProps) {
  const { title, subtitle, cityData } = props;

  if (!cityData) {
    return (
      <div className="card border-2 border-white rounded-0 bg-black">
        <div className="card-body bg-black">
          {title && <h5 className="card-title text-white">{title}</h5>}
          {subtitle && (
            <h6 className="card-subtitle mb-2 fs-5 mt-1 text-body-secondary">{subtitle}</h6>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-2 border-white rounded-0 bg-black">
      <div className="card-body bg-black text-white">
        <div className="d-flex align-items-center mb-3">
          <img
            src={cityData.weatherIconUrl}
            alt={cityData.description}
            style={{ width: 72, height: 72, objectFit: "contain", marginRight: 12 }}
          />
          <div>
            <h5 className="card-title text-white mb-0">{cityData.cityName}</h5>
            <h6 className="card-subtitle fs-6 text-body-secondary mb-0">{cityData.description}</h6>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <p className="mb-1"><strong>Temperatura:</strong> {cityData.temperature}°C</p>
            <p className="mb-1"><strong>Percepita:</strong> {cityData.feelsLike}°C</p>
            <p className="mb-1"><strong>Min / Max:</strong> {cityData.tempMin}°C / {cityData.tempMax}°C</p>
          </div>
          <div className="col-6">
            <p className="mb-1"><strong>Umidità:</strong> {cityData.humidity}%</p>
            <p className="mb-1"><strong>Vento:</strong> {cityData.windSpeed} km/h</p>
            <p className="mb-1"><strong>Pressione:</strong> {cityData.pressure} hPa</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="mb-0 small text-body-secondary">
          <strong>Coordinate:</strong> {cityData.lat.toFixed(2)}°, {cityData.lon.toFixed(2)}°
        </p>
      </div>
    </div>
  );
}

export default CardInfo;
