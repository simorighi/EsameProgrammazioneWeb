import NavigationButton from "../components/componentsReusable/Button";
import SearchBar from "../components/componentsReusable/SearchBar";

import pioggiaImg from "../assets/bgPioggia.jpg";

const pioggia = pioggiaImg;

function Home() {
  return (
    <>
      <div className="hero-section"
        style={{
          backgroundImage: `url(${pioggia})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "650px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
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
    </>
  );
}

export default Home;
