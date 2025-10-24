import { useEffect, useState } from "react";
import { getOrderIdFromCookie } from "../../utils/FromCookie";
import { fetchGetOrderById } from "../../utils/OrderApi";
import type { Order } from "../../utils/Interfaces";

function ShowOrderpage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orderId = getOrderIdFromCookie();
    console.log("Order ID från cookie:", orderId);

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
      <h1>Tack för din order!🎉</h1>
      <div>
        {order ? (
          <div>
            <h2>Orderdetaljer</h2>
            <p>Order ID: {order.id}</p>
            <p>
              Kundnamn: {order.customer.firstName} {order.customer.lastName}
            </p>
            <p>Email: {order.customer.email}</p>
            <p>
              Shipping Address: {order.customer.shippingAddress},{" "}
              {order.customer.shippingCity}, {order.customer.postalCode}
            </p>
            <p>Phone Number: {order.customer.phoneNumber}</p>
            <h3>Produkter i din order</h3>
            <ul>
              {order.cart.items.map((item) => (
                <li key={item.id}>
                  {item.canvas.title} - Antal: {item.numberOfCanvases} - Pris:{" "}
                  {item.canvas.price} kr
                </li>
              ))}
            </ul>
            <p>
              <strong>Totalt pris: {order.totalPrice} kr</strong>
            </p>
          </div>
        ) : (
          <p>Ingen orderinformation tillgänglig.</p>
        )}
      </div>
    </div>
  );
}
export default ShowOrderpage;
