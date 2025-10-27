import { useEffect, useState } from "react";

import { fetchGetOrderById } from "../../utils/OrderApi";
import type { Order } from "../../utils/Interfaces";
import { getOrderIdFromLocalstorage } from "../../utils/FromLocalstorage";
import "../css/ShowOrderpage.css";

function ShowOrderpage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orderId = getOrderIdFromLocalstorage();
    console.log("Order ID från localstorage:", orderId);

    if (orderId) {
      fetchGetOrderById(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((error) => {
          console.error("Fel vid hämtning av order:", error);
        });
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
