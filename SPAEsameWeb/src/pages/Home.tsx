import NavigationButton from "../components/componentsReusable/Button";
import SearchBar from "../components/componentsReusable/SearchBar";

import pioggiaImg from "../assets/pioggia.png";
import pioggiaBg from "../assets/BgPioggia.png";
import CardInfo from "../components/componentsReusable/CardInfo";
import CardCity from "../components/componentsReusable/CardCity";

/* da cambiare lo sfondo in base al tempo */
const pioggia = pioggiaImg;
const pioggia_background = pioggiaBg;

function Home() {
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
          <CardInfo title="Vento" subtitle="Valorer dalla API" />
        </div>
        <div className="col-4 p-0">
          <CardInfo title="Pioggia" subtitle="Valorer dalla API" />
        </div>
        <div className="col-4 p-0">
          <CardInfo title="Umidità" subtitle="Valorer dalla API" />
        </div>
      </div>


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
