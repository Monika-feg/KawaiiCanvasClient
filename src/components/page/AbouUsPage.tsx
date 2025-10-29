import "../css/AboutUs.css";

const BeeUrl =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761721493/bee-9661840_640_cozlgx.png";

function AboutUsPage() {
  return (
    <div>
      <header>
        <h1>Om oss!</h1>
      </header>
      <p>
        Hej och välkommen till KawaiiCanvas! 🌸 Allt började som ett skolprojekt
        men växte snabbt till något större. Vi ville skapa något som fick folk
        att le, något enkelt, glatt och fullt av färg.
        <br />
        Resultatet blev KawaiiCanvas en liten webshop fylld med söta tavlor som
        sprider glädje i varje rum. Vi inspireras av japansk kawaii-kultur men
        blandar in vår egen stil och humor. Varje motiv är gjort med kärlek,
        detaljer och en gnutta lekfullhet. Oavsett om du gillar gulliga djur,
        pastellfärger eller roliga små karaktärer hoppas vi att du hittar något
        som känns helt rätt för dig. 🐰💖
        <br />
        För oss handlar KawaiiCanvas inte bara om att sälja tavlor utan om att
        skapa något som får vardagen att kännas lite lättare och roligare. Vi
        tror att även små saker, som ett leende motiv på väggen, kan göra
        skillnad.
        <img src={BeeUrl} alt="Kawaii Bee" className="bee-component" />
        <br />
        Tack för att du tittar in och stöttar vårt projekt. Varje beställning
        betyder massor för oss och gör det möjligt att fortsätta skapa ännu fler
        söta saker. 💕
      </p>
    </div>
  );
}
export default AboutUsPage;
