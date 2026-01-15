import { Link } from "react-router-dom";

function Navbar() {
  // Array di configurazione per le pagine
  const pages = [
    { name: "Home", path: "/" },
    { name: "Favorites", path: "/favorites" },
    { name: "City Details", path: "/CityDetails" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-opacity- bg-body-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3 me-5 text-decoration-none text-black">
          <strong className="ms-5">SPAMeteoRighi</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5 fs-5 gap-4">
            {pages.map((page, index) => (
              <li key={index}>
                <Link to={page.path} className="nav-item text-decoration-none text-black">
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
          <span className="navbar-text">DA FA IL LOGIN CAZO</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;