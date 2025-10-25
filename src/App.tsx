import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CanvasPage from "./components/page/Canvaspage";
import CartPage from "./components/page/CartPage";
import HomePage from "./components/page/HomePage";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import OrderPage from "./components/page/OrderPage";
import ShowOrderpage from "./components/page/ShowOrderpage";
import { fetchNewCart } from "./utils/CartApi";
import type { Cart } from "./utils/Interfaces";

function App() {
  const [, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    // Skapa ny cart och få tillbaka cart-objektet från backend
      fetchNewCart()
        .then((cart) => {
          console.log("Cart från backend:", cart);
          setCart(cart);
        })
      .catch(() => {});
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
