import NavigationButton from "../components/componentsReusable/Button";
import SearchBar from "../components/componentsReusable/SearchBar";

import pioggiaImg from "../assets/pioggia.png";
import pioggiaBg from "../assets/BgPioggia.png";
import CardInfo from "../components/componentsReusable/CardInfo";
import CardCity from "../components/componentsReusable/CardCity";
import { getCurrentWeatherByCity, type WeatherData } from "../utils/weatherApi";
import { useState, useEffect } from "react";

/* da cambiare lo sfondo in base al tempo */
const pioggia = pioggiaImg;
/* const pioggia_background = pioggiaBg;
 */


function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Recupera i dati meteo quando il componente si monta
  useEffect(() => {
    const fetchWeather = async () => {
      console.log("🔄 Inizio caricamento dati meteo...");
      const data = await getCurrentWeatherByCity("Roma"); // Cambia città qui
      console.log("✅ Dati ricevuti:", data);
      setWeatherData(data);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ position: "relative" }}>
        <img
          src={pioggia} alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            objectFit: "cover",
          }}
        />
        <div className="row" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="col-12"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "700px",
            }}
          >


            <h2 className="text-white">
              📍 {loading ? "Caricamento..." : weatherData?.cityName || "N/A"}
            </h2>

            <SearchBar />

            <NavigationButton
              colorBackground="#222121"
              borderColor="#222121"
              textColor="#ffffff"
              contentText="Vedi dettagli →"
              fontSize="fs-6"
              
            />
          </div>
        </div>
      </div>

    {/* ROW PER INFO DELLA CITTA PRINCIPALE (VENTO PIOGGIA UMIDITA) */}
      <div className="row bg-black m-0">
        <div className="col-4 p-0" >
          <CardInfo 
            title="Vento" 
            subtitle={loading ? "Caricamento..." : `${weatherData?.windSpeed} km/h`} 
          />
        </div>
        <div className="col-4 p-0">
          <CardInfo 
            title="Descrizione" 
            subtitle={loading ? "Caricamento..." : weatherData?.description || "N/A"} 
          />
        </div>
        <div className="col-4 p-0">
          <CardInfo 
            title="Umidità" 
            subtitle={loading ? "Caricamento..." : `${weatherData?.humidity}%`} 
          />
        </div>
      </div>

      {/* RIGA AGGIUNTIVA CON ALTRI PARAMETRI */}
      {weatherData && (
        <div className="row bg-black m-0 border-top" style={{ borderColor: "#444" }}>
          <div className="col-12 p-4">
            <h3 style={{ color: "#fff", marginBottom: "20px" }}>
              📍 {weatherData.cityName} - Dettagli Meteo
            </h3>
            <div className="row">
              <div className="col-md-3 mb-3">
                <div style={{ backgroundColor: "#222", padding: "15px", borderRadius: "8px" }}>
                  <p style={{ color: "#aaa", marginBottom: "5px" }}>Temperatura</p>
                  <p style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                    {weatherData.temperature}°C
                  </p>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div style={{ backgroundColor: "#222", padding: "15px", borderRadius: "8px" }}>
                  <p style={{ color: "#aaa", marginBottom: "5px" }}>Percepita</p>
                  <p style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                    {weatherData.feelsLike}°C
                  </p>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div style={{ backgroundColor: "#222", padding: "15px", borderRadius: "8px" }}>
                  <p style={{ color: "#aaa", marginBottom: "5px" }}>Min/Max</p>
                  <p style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                    {weatherData.tempMin}° / {weatherData.tempMax}°C
                  </p>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div style={{ backgroundColor: "#222", padding: "15px", borderRadius: "8px" }}>
                  <p style={{ color: "#aaa", marginBottom: "5px" }}>Pressione</p>
                  <p style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                    {weatherData.pressure} hPa
                  </p>
                </div>
              </div>
            </div>
            {weatherData.weatherIconUrl && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <img 
                  src={weatherData.weatherIconUrl} 
                  alt={weatherData.description}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}


      {/* row per le CardCity  */}
      <div className="row bg-black pt-5 pb-5 px-3">
        <div className="col-4" >
          <CardCity
            cityName="Città 1"
            temperature={25}
            weatherIconUrl="https://<weather_icon_url>"
          />
        </div>
        <div className="col-4">
          <CardCity
            cityName="Città 2"
            temperature={20}
            weatherIconUrl="https://<weather_icon_url>"
          />
        </div>
        <div className="col-4">
          <CardCity
            cityName="Città 3"
            temperature={18}
            weatherIconUrl="https://<weather_icon_url>"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
