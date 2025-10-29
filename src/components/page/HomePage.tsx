const mushroomImage =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761549231/mushroom-7882773_640_1_uzn5d2.png";

function HomePage() {
  return (
    <div>
      <header>
        <h1>Välkommen till KawaiiCanvas!! 🎀</h1>
      </header>
      <p>
        Välkommen till KawaiiCanvas – platsen där varje vägg förtjänar lite
        kawaii-magi! ✨ Våra tavlor är skapade för att sprida leenden, färg och
        ren glädje. Men varning… det är svårt att välja bara en! 🐻🎀
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
