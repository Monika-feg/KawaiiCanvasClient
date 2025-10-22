import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CanvasPage from "./components/Canvaspage";
import CartPage from "./components/CartPage";
import HomePage from "./components/HomePage";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { fetchNewCart } from "./utils/CartApi";
import OrderPage from "./components/OrderPage";
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
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
