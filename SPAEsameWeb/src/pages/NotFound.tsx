import { Link } from "react-router-dom";
import "./NotFound.css"; // Mantieni questo per l'animazione del fulmine
import NavigationButton from "../components/componentsReusable/Button";
import Gatto from "../fulmine/fulmine";

function NotFound() {
  // Pagina 404 personalizzata con animazione fulmine e bottone per tornare alla Home
  return (
    // MODIFICA: Container flex che centra tutto e occupa l'intera altezza (min-vh-100)
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-3 overflow-hidden">

      {/* SVG fulmine decorativo */}
      {/* MODIFICA: Rimosse dimensioni fisse, usato stile per renderlo fluido */}
      <svg
        className="lightning mb-3"
        viewBox="0 0 200 300"
        style={{ width: "100%", maxWidth: "150px", height: "auto" }}
      >
        <polyline
          points="100,0 140,120 110,120 160,300 60,140 90,140 30,0 "
          className="lightning-path"
        />
      </svg>

      {/* Messaggio 404 */}
      {/* MODIFICA: Utilizzo di display-1 per testo grande responsive */}
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead mb-4">La tempesta ha cancellato questa pagina</p>

      {/* Bottone per tornare alla Home */}
      {/* MODIFICA: Aggiunto text-decoration-none per rimuovere la sottolineatura del link */}
      <Link to="/" className="back-btn text-decoration-none mb-4">
        <NavigationButton
          colorBackground="#ffffff"
          borderColor="#000000"
          textColor="#000000"
          contentText="Torna alla Home"
          fontSize="fs-5"
        />
      </Link>

      {/* Componente extra decorativo */}
      <div className="mt-3">
        <Gatto/>
      </div>
    </div>
  );
}

export default NotFound;