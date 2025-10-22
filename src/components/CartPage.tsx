import { useEffect, useState } from "react";
import { fetchGetCartById } from "../utils/CartApi";
import type { Cart } from "../utils/Interfaces";
import { getCartIdFromCookie } from "../utils/CartFromCookie";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Här kan du hämta kundvagnens innehåll
    const cartId = getCartIdFromCookie();
    if (cartId) {
      fetchGetCartById(cartId)
        .then((data) => {
          setCart(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Kundvagnen kunde inte hämtas.");
          setLoading(false);
        });
    } else {
      setError("Ingen kundvagn hittades.");
      setLoading(false);
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

  // Debug-logg: visa vad cart innehåller
  console.log("Cart från backend:", cart);
  return (
    <>
      <div>
        <h2>Kundvagn</h2>
      </div>
      <div>
        <Container>
          <Row>
            {cart && cart.canvases && cart.canvases.length > 0 ? (
              cart.canvases.map((item) => (
                <div key={item.id}>
                  <h3>{item.title}</h3>
                  <p>Price: {item.price} kr</p>
                </div>
              ))
            ) : (
              <p>Inga produkter i kundvagnen.</p>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
export default CartPage;
