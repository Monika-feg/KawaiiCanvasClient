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


import BotComponent from "./components/BotComponent";


import { fetchNewCart } from "./utils/CartApi";
import type { Cart } from "./utils/Interfaces";
import { setCartIdToLocalstorage } from "./utils/FromLocalstorage";

const BotUrl =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761549231/mushroom-7882773_640_1_uzn5d2.png";

function App() {
  const [, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    fetchNewCart()
      .then((cart) => {
        console.log("Cart från backend:", cart);
        setCart(cart);
        setCartIdToLocalstorage(cart.id);
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
