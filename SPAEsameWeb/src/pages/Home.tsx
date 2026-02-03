import SearchBar from "../components/componentsReusable/SearchBar";

import pioggiaImg from "../assets/pioggia.png";
import CardInfo from "../components/componentsReusable/CardInfo";
import CardCity from "../components/componentsReusable/CardCity";
import { getCurrentWeatherByCity, getWeatherForMultipleCities, type WeatherData } from "../utils/weatherApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* da cambiare lo sfondo in base al tempo */
const pioggia = pioggiaImg;


function Home() {
  const navigate = useNavigate();
  const handleSearch = (city: string) => {
    navigate(`/city/${encodeURIComponent(city)}`);
  };
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [otherCities, setOtherCities] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
   

  // Recupera i dati meteo quando il componente si monta
  useEffect(() => {
    const fetchWeather = async () => {
      console.log("caricamento dati");
      const data = await getCurrentWeatherByCity("Roma"); // Cambia città qui
      console.log("Dati ricevuti:", data);
      setWeatherData(data);

      // Carica i dati delle altre città
      const cities = ["Milano", "Napoli", "Firenze"];
      const citiesData = await getWeatherForMultipleCities(cities);
      console.log("Dati altre città:", citiesData);
      setOtherCities(citiesData);

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

            <hr className="rigaBianca" />
            <h1 className="text-white  border-start border-3 p-2">
            {loading ? "Caricamento..." : weatherData?.cityName || "N/A"}
            </h1>
            <h2 className="text-white display-1 fw-bold">
              {loading ? "Caricamento..." : `${Math.round(weatherData?.temperature || 0)}°C`}
            </h2>

            <SearchBar onSearch={handleSearch} />

          </div>
        </div>
      </div>

    {/* ROW PER INFO DELLA CITTA PRINCIPALE (VENTO PIOGGIA UMIDITA) */}
      <div className="row bg-black m-0">
        <div className="col-md-4 col-xs-6 p-0" >
          <CardInfo 
            title="Vento" 
            subtitle={loading ? "Caricamento..." : `${weatherData?.windSpeed} km/h`} 
          />
        </div>
        <div className="col-4 col-xs-6 p-0">
          <CardInfo 
            title="Descrizione" 
            subtitle={loading ? "Caricamento..." : weatherData?.description || "N/A"} 
          />
        </div>
        <div className="col-4 col-xs-6 p-0">
          <CardInfo 
            title="Umidità" 
            subtitle={loading ? "Caricamento..." : `${weatherData?.humidity}%`} 
          />
        </div>
      </div>

 


      {/* row per le CardCity  */}
      <div className="row bg-black pt-5 pb-5 px-3">
        {otherCities.length > 0 ? (
          otherCities.map((city, index) => (
            <div className="col-4 p-5" key={index}>
              <CardCity cityData={city} />
            </div>
          ))
        ) : (
          <p>impossibile caricare le città</p>
        )}
      </div>
    </>
  );
}

export default Home;
