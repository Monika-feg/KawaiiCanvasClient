import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CanvasPage from "./components/page/Canvaspage";
import CartPage from "./components/page/CartPage";
import HomePage from "./components/page/HomePage";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { fetchNewCart } from "./utils/CartApi";
import { getCartIdFromCookie } from "./utils/FromCookie";
import OrderPage from "./components/page/OrderPage";
import ShowOrderpage from "./components/page/ShowOrderpage";

function App() {
  useEffect(() => {
    const cartId = getCartIdFromCookie();
    if (!cartId) {
      fetchNewCart().then((cart) => {
        console.log("New cart created with ID:", cart.id);
        setTimeout(() => {
          console.log("document.cookie efter skapande:", document.cookie);
          console.log("cartId från funktionen:", getCartIdFromCookie());
        }, 30000); // Vänta 30 sekunder för att se om cookien dyker upp
      });
    }
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
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
