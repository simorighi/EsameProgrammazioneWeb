import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
   return (
    <div className="notfound-container">
      <svg
        className="lightning"
        width="200"
        height="400"
        viewBox="0 0 200 300"
      >
        <polyline
          points="100,0 140,120 110,120 160,300 60,140 90,140 30,0 "
          className="lightning-path"
        />
      </svg>

      <h1> <strong>404</strong> </h1>
      <p>La tempesta ha cancellato questa pagina</p>

      <Link to="/" className="back-btn">
        Torna alla Home
      </Link>
    </div>
  );
}

export default NotFound;
