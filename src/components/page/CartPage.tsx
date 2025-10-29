import { useEffect, useState } from "react";
import {
  fetchAddCanvasToCart,
  fetchGetCartById,
  fetchGetCartTotalPrice,
  fetchRemoveCanvasFromCart,
} from "../../utils/CartApi";
import type { Cart } from "../../utils/Interfaces";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "../css/Cart.css";
import OrderPage from "../page/OrderPage";
import Button from "react-bootstrap/esm/Button";
import { getCartIdFromLocalstorage } from "../../utils/FromLocalstorage";

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // denna useEffect hämtar kundvagnens innehåll och hämtar cart ifrån localstorage
  useEffect(() => {
    const cartId = getCartIdFromLocalstorage();
    // Här kan du hämta kundvagnens innehåll
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

  // denna useEffect hämtar totalpriset för kundvagnen
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

  // visar laddningsmeddelande eller felmeddelande
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

  // uppdaterar antal tavlor i kundvagnen
  const updateQuantity = async (canvasId: string, newQuantity: number) => {
    if (!cart || !cart.id) return;
    if (newQuantity < 1) return;

    try {
      const updatedCart = await fetchAddCanvasToCart(
        cart.id,
        canvasId,
        newQuantity
      );
      setCart(updatedCart);
    } catch (error) {
      alert("Kunde inte uppdatera antal.");
    }
  };

  // tar bort en tavla ifrån kundvagnen
  const handleDelete = (canvasId: string) => {
    console.log("Klickar på delete knappen");
    fetchRemoveCanvasFromCart(cart!.id, canvasId)
      .then(() => {
        setCart((prevCart) => {
          if (!prevCart) return null;
          return {
            ...prevCart,
            items: prevCart.items
              ? prevCart.items.filter((c) => c.canvas.id !== canvasId)
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

      <hr className="cart-divider" />

      <div>
        <Container>
          <Row>
            {cart && cart.items && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img
                    src={item.canvas.imageUrl}
                    alt={item.canvas.title}
                    width={80}
                  />
                  <div className="cart-item-title">{item.canvas.title}</div>
                  <div className="cart-item-price">{item.canvas.price} kr</div>
                  <div className="cart-item-controls">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuantity(
                          item.canvas.id,
                          item.numberOfCanvases - 1
                        )
                      }
                      disabled={item.numberOfCanvases <= 1}
                    >
                      -
                    </Button>
                    <span className="cart-item-qty">
                      {item.numberOfCanvases}
                    </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuantity(
                          item.canvas.id,
                          item.numberOfCanvases + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => handleDelete(item.canvas.id)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>Inga produkter i kundvagnen.</p>
            )}
          </Row>
        </Container>

        <hr className="cart-divider" />
        <div>
          <p>Fraktkostnad: 49 kr – över 200 kr fraktfritt</p>
          <h2>Totalpris: {totalPrice} kr</h2>
        </div>
      </div>

      <hr className="cart-divider" />
      <div>{cart && cart.items && cart.items.length > 0 && <OrderPage />}</div>
    </>
  );
}
export default CartPage;
