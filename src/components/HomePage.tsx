import { useEffect } from "react";

import { fetchNewCart } from "../utils/CartApi";

function HomePage() {
  useEffect(() => {
    // Här kan du lägga till logik för att hämta eller skapa en kundvagn om det behövs
    fetchNewCart().then((cartId) => {
      console.log("New cart created with ID:", cartId);
    });
  }, []);

  return (
    <div>
      <h1>Välkommen till KawaiiCanvas!! 🎀</h1>
      <p>
        Varning: Våra tavlor kan orsaka akut “awww”-syndrom, överdrivet leende
        och behov av fler väggar 🐰💖
      </p>
    </div>
  );
}
export default HomePage;
