import NavigationButton from "../components/componentsReusable/Button";
import SearchBar from "../components/componentsReusable/SearchBar";

import pioggiaImg from "../assets/bgPioggia.jpg";
import CardInfo from "../components/componentsReusable/CardInfo";

/* da cambiare lo sfondo in base al tempo */
const pioggia = pioggiaImg;

function Home() {
  return (
    <>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${pioggia})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "650px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          filter: "brightness(70%)",
          zIndex: -1,
        }}
      >
        <h1>Benvenuto su SPA Meteo</h1>

        <SearchBar />
        <NavigationButton
          colorBackground="#ffffff"
          borderColor="#000000"
          textColor="#000000"
          contentText="Vedi dettagli->"
          fontSize="fs-5"
        />
      </div>

      <div className="row">
        <div className="col-4">
          <CardInfo 
            title="Vento"
            subtitle="Valorer dalla API"
          />
        </div>
        <div className="col-4">
          <CardInfo 
            title="Pioggia"
            subtitle="Valorer dalla API"
          />
        </div>
        <div className="col-4">
          <CardInfo 
            title="Umidità"
            subtitle="Valorer dalla API"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
