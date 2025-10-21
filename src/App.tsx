import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CanvasPage from "./components/Canvaspage";
import CartPage from "./components/CartPage";
import HomePage from "./components/HomePage";
import CustomNavbar from "./components/Navbar";
function App() {
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
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
