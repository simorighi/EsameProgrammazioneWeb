import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CityDetails from "./pages/CityDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/CityDetails" element={<CityDetails/>} />
            <Route path="*" element={<NotFound/>} />
            <Route />
          </Routes>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
