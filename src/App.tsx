import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CanvasPage from "./components/page/Canvaspage";
import CartPage from "./components/page/CartPage";
import HomePage from "./components/page/HomePage";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { fetchNewCart } from "./utils/CartApi";
import OrderPage from "./components/page/OrderPage";
import ShowOrderpage from "./components/page/ShowOrderpage";

import BotComponent from "./components/BotComponent";

function App() {
  useEffect(() => {
    // Här kan du lägga till logik för att hämta eller skapa en kundvagn om det behövs
    fetchNewCart().then((cartId) => {
      console.log("New cart created with ID:", cartId);
    });
  }, []);

  return (
    <>
      <Router>
        <div>
          <CustomNavbar />
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/canvas" element={<CanvasPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/show-order" element={<ShowOrderpage />} />
            </Routes>
          </div>
          <div>
            <BotComponent />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
