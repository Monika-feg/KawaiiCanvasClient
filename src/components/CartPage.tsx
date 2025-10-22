import { useEffect, useState } from "react";
import {
  fetchGetCartById,
  fetchGetCartTotalPrice,
  fetchRemoveCanvasFromCart,
} from "../utils/CartApi";
import type { Cart } from "../utils/Interfaces";
import { getCartIdFromCookie } from "../utils/CartFromCookie";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

  useEffect(() => {
    if (cart && cart.id) {
      fetchGetCartTotalPrice(cart.id)
        .then((totalPrice) => {
          console.log("Totalpris för kundvagn:", totalPrice);
          setTotalPrice(totalPrice);
        })
        .catch(() => {
          setError("Kunde inte hämta totalpris för kundvagnen.");
        });
    }
  }, [cart]);

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

  const handleDelete = (canvasId: string) => {
    console.log("Klickar på delete knappen");
    fetchRemoveCanvasFromCart(cart!.id, canvasId)
      .then(() => {
        // Ta bort den borttagna canvasen från state
        setCart((prevCart) => {
          if (!prevCart) return null;
          return {
            ...prevCart,
            canvases: prevCart.canvases
              ? prevCart.canvases.filter((c) => c.id !== canvasId)
              : [],
          };
        });
      })
      .catch(() => {
        setError("Kunde inte ta bort tavlan från kundvagnen.");
      });
  };

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
                  <button onClick={() => handleDelete(item.id)}>X</button>
                </div>
              ))
            ) : (
              <p>Inga produkter i kundvagnen.</p>
            )}
          </Row>
        </Container>
        <div>
          <p>Fraktkostnad: 49Kr över 200 kr fraktfritt </p>
          <h2>Totalpris:{totalPrice} kr</h2>
        </div>
      </div>
    </>
  );
}
export default CartPage;
