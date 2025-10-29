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
import { getCartIdFromLocalstorage } from "../../utils/FromLocalstorage";
import { useLiveUpdateStock } from "../../utils/LiveUpdateStock";

function CanvasPage() {
  const [products, setProducts] = useState<Canvas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const stock = useLiveUpdateStock();

  // hämtar tavlor från backend och lagerstatus
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
    const cartId = getCartIdFromLocalstorage();
    if (!cartId) {
      console.log("Ingen kundvagn hittades. " + cartId);
      return;
    }
    try {
      const cartId = getCartIdFromLocalstorage();
      // Hämta aktuell kundvagn
      const cartRes = await fetchGetCartById(cartId);
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
  console.log("ALL STOCK:", stock);
  return (
    <Container>
      <Row>
        {products.map((p) => {
          const liveStock = stock.find((item) => item.itemId === p.id);
          console.log(
            "DEBUG:",
            p.title,
            "liveStock:",
            liveStock,
            "quantity:",
            liveStock?.quantity,
            typeof liveStock?.quantity
          );
          return (
            <Col key={p.id} xs={12} sm={6} md={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={p.imageUrl} />
                <Card.Body className="card-body">
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>{p.price}</Card.Text>
                  <Card.Text>
                    {(() => {
                      const qty = liveStock
                        ? liveStock.quantity
                        : p.stockQuantity;
                      if (qty === 0) {
                        return <span className="stock-out">Slut i lager!</span>;
                      } else if (qty > 0 && qty < 5) {
                        return (
                          <span className="blink stock-warning">
                            Endast {qty} kvar!
                          </span>
                        );
                      } else {
                        return <>Lagerstatus: {qty}</>;
                      }
                    })()}
                  </Card.Text>
                  <Button
                    className="canvas-button"
                    onClick={() => handleAddToCart(p.id)}
                  >
                    Lägg i varukorgen
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default CanvasPage;
