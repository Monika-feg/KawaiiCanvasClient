import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchGetAllCanvas } from "../utils/CanvasApi";
import type { Canvas } from "../utils/Interfaces";
import "../components/css/Canvas.css";
import { fetchAddCanvasToCart } from "../utils/CartApi";
import { getCartIdFromCookie } from "../utils/CartFromCookie";

const imageUrl = [
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1760453935/ai-generated-8362469_640_p1gtnz.png",
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1760453958/cat-7057971_640_lmlm6l.png",
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1760453966/rabbit-4031334_640_zfr1e0.png",
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1760453978/anime-9551089_640_zizyvp.jpg",
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1760453944/anime-9685807_640_oods8g.jpg",
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1760453949/ai-generated-9509334_640_ouv1x4.jpg",
];
function CanvasPage() {
  const [products, setProducts] = useState<Canvas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string>("");

  // hämtar cartId från cookie
  useEffect(() => {
    const id = getCartIdFromCookie();
    if (id) setCartId(id);
  }, []);

  // hämtar tavlor från backend
  useEffect(() => {
    try {
      fetchGetAllCanvas().then((data) => {
        setProducts(data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
      setError("Kunde inte hämta Tavlor ");
    }
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const handleAddToCart = (canvasId: string) => {
    console.log(" Klick på mig! ");
    // det är här websocket ska anroppas
    // flytta till kundvagnen
    if (!cartId) {
      console.log("Ingen kundvagn hittades. " + cartId);
      return;
    }
    fetchAddCanvasToCart(cartId, canvasId)
      .then(() => alert("Tavla tillagd i kundvagnen!"))
      .catch((error) => {
        console.error("Error adding canvas to cart:", error);
        alert("Kunde inte lägga till tavlan i kundvagnen.");
      });
  };

  return (
    <Container>
      <Row>
        {products.map((p, index) => (
          <Col key={p.id} xs={12} sm={6} md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={imageUrl[index]} />
              <Card.Body className="card-body">
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>{p.price}</Card.Text>
                <Button
                  className="canvas-button"
                  onClick={() => handleAddToCart(p.id)}
                >
                  Lägg i varukorgen
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CanvasPage;
