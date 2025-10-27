const mushroomImage =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761549231/mushroom-7882773_640_1_uzn5d2.png";

function HomePage() {
  return (
    <div>
      <h1>Välkommen till KawaiiCanvas!! 🎀</h1>
      <p>
        Varning: Våra tavlor kan orsaka akut “awww”-syndrom, överdrivet leende
        och behov av fler väggar 🐰💖
      </p>
      <img
        src={mushroomImage}
        alt="Kawaii Mushroom"
        className="home-mushroom"
      />
    </div>
  );
}
export default HomePage;
