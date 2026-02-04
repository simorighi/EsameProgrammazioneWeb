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
  // Hook per navigare tra le pagine
  const navigate = useNavigate();

  // Funzione chiamata dalla SearchBar per andare alla pagina dettagli della città
  const handleSearch = (city: string) => {
    navigate(`/city/${encodeURIComponent(city)}`);
  };

  // Stati principali: meteo città principale, altre città e loading
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [otherCities, setOtherCities] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
    
  // Effetto per caricare i dati meteo al montaggio del componente
  useEffect(() => {
    const fetchWeather = async () => {
      console.log("caricamento dati");

      // Dati meteo città principale (Roma)
      const data = await getCurrentWeatherByCity("Roma"); 
      console.log("Dati ricevuti:", data);
      setWeatherData(data);

      // Dati meteo altre città
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
      {/* Sfondo e intestazione con temperatura e SearchBar */}
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
              minHeight: "700px", // Considera di usare min-vh-100 per full screen su mobile
              padding: "20px" // Aggiunto padding per evitare che il testo tocchi i bordi su mobile
            }}
          >
            <hr className="rigaBianca" />
            <h1 className="text-white border-start border-3 p-2 text-center">
              {loading ? "Caricamento..." : weatherData?.cityName || "N/A"}
            </h1>
            <h2 className="text-white display-1 fw-bold text-center">
              {loading ? "Caricamento..." : `${Math.round(weatherData?.temperature || 0)}°C`}
            </h2>

            <div className="w-100 d-flex justify-content-center mt-3">
                <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Informazioni principali della città (vento, descrizione, umidità) */}
      <div className="row bg-black m-0 text-center">
        {/* MODIFICA: col-12 su mobile, col-md-4 da tablet in su */}
        <div className="col-12 col-md-4 p-3 border-bottom border-md-0 border-secondary">
          <CardInfo 
            title="Vento" 
            subtitle={loading ? "Caricamento..." : `${weatherData?.windSpeed} km/h`} 
          />
        </div>
        <div className="col-12 col-md-4 p-3 border-bottom border-md-0 border-secondary">
          <CardInfo 
            title="Descrizione" 
            subtitle={loading ? "Caricamento..." : weatherData?.description || "N/A"} 
          />
        </div>
        <div className="col-12 col-md-4 p-3">
          <CardInfo 
            title="Umidità" 
            subtitle={loading ? "Caricamento..." : `${weatherData?.humidity}%`} 
          />
        </div>
      </div>

      {/* Card per altre città */}
      <div className="row bg-black pt-5 pb-5 px-3">
        {otherCities.length > 0 ? (
          otherCities.map((city, index) => (
            /* MODIFICA: Grid responsiva e padding ridotto su mobile */
            <div className="col-12 col-md-6 col-lg-4 p-3 p-md-5" key={index}>
              <CardCity cityData={city} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-white">
             <p>impossibile caricare le città</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;