import { useEffect, useState } from "react";

import type { Order } from "../../utils/Interfaces";
import "../css/ShowOrderpage.css";
import { fetchGetPaymentStatus } from "../../utils/StripeApi";

function ShowOrderpage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [, setStatus] = useState<string>("");

  // denna useEffect hämtar betalningsstatus och orderdetaljer baserat på session_id i URL:en
  useEffect(() => {
    let sessionId = null;
    if (window.location.hash) {
      const hashParams = new URLSearchParams(
        window.location.hash.split("?")[1]
      );
      sessionId = hashParams.get("session_id");
    } else {
      const params = new URLSearchParams(window.location.search);
      sessionId = params.get("session_id");
    }
    console.log("Session ID från URL:", sessionId);
    console.log("Session ID från URL:", sessionId);

    if (sessionId) {
      fetchGetPaymentStatus(sessionId)
        .then((res) => {
          console.log("Payment status response:", res);
          setStatus("Betalning lyckades!");
          if (res) setOrder(res);
        })
        .catch((error) => {
          setStatus("Betalning misslyckades eller avbröts.");
          console.error("Fel vid hämtning av order:", error);
        });
    } else {
      setStatus("Ingen session ID hittades i URL:en.");
    }
  }, []);

  return (
    <div>
      <h1>Tack för din order! 🎉</h1>
      {order ? (
        <div className="order-leaf-list">
          <h2>Orderdetaljer</h2>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Kundnamn:</strong> {order.customer.firstName}{" "}
            {order.customer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <p>
            <strong>Leveransadress:</strong> {order.customer.shippingAddress},{" "}
            {order.customer.shippingCity}, {order.customer.postalCode}
          </p>
          <p>
            <strong>Telefon:</strong> {order.customer.phoneNumber}
          </p>
          <h3>Produkter i din order</h3>
          <ul>
            {order.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <li key={item.id}>
                  <img
                    src={item.canvas.imageUrl}
                    alt={item.canvas.title}
                    width={80}
                  />
                  <span> Antal: {item.numberOfCanvases}</span>{" "}
                  <span> Pris: {item.canvas.price} kr</span>
                </li>
              ))
            ) : (
              <li>Inga produkter i denna order.</li>
            )}
          </ul>
          <p style={{ marginTop: "1.5em", fontWeight: "bold" }}>
            Totalt pris: {order.totalPrice} kr
          </p>
        </div>
      ) : (
        <p>Ingen orderinformation tillgänglig.</p>
      )}
    </div>
  );
}
export default ShowOrderpage;
