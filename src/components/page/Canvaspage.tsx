import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchGetAllCanvas } from "../../utils/CanvasApi";
import type { Canvas } from "../../utils/Interfaces";
import "../css/Canvas.css";
import { fetchAddCanvasToCart, fetchGetCartById } from "../../utils/CartApi";
import { getCartIdFromCookie, logAllCookies } from "../../utils/FromCookie";

function CanvasPage() {
  const [products, setProducts] = useState<Canvas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setCartId] = useState<string>("");

  // Logga alla cookies vid sidladdning
  useEffect(() => {
    logAllCookies();
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

  const handleAddToCart = async (canvasId: string) => {
    const cartId = getCartIdFromCookie();
    if (!cartId) {
      console.log("Ingen kundvagn hittades. " + cartId);
      return;
    }
    try {
      // Hämta aktuell kundvagn
      const cartRes = await fetchGetCartById();
      // Kolla om canvasen redan finns i kundvagnen
      const foundItem = cartRes.items.find(
        (item) => item.canvas.id === canvasId
      );
      const newQuantity = foundItem ? foundItem.numberOfCanvases + 1 : 1;
      await fetchAddCanvasToCart(cartId, canvasId, newQuantity);
      alert("Tavla tillagd i kundvagnen!");
    } catch (error) {
      console.error("Error adding canvas to cart:", error);
      alert("Kunde inte lägga till tavlan i kundvagnen.");
    }
  };

  return (
    <Container>
      <Row>
        {products.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={p.imageUrl} />
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
