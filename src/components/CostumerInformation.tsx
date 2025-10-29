import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { fetchCreateOrder } from "../utils/OrderApi";
import type { Payment } from "../utils/Interfaces";
import { fetchCreatePayment } from "../utils/StripeApi";
import {
  getCartIdFromLocalstorage,
  setOrderIdToLocalstorage,
} from "../utils/FromLocalstorage";

function CostumerInformation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [, setPayment] = useState<Payment | null>(null);

  // hanterar inlämning av kundinformation och skapar order och payment
  const handleCostumerInfo = async () => {
    console.log("Handling customer info submission");
    setError("");
    setSuccess("");
    // Enkel validering
    if (
      !firstName ||
      !lastName ||
      !email ||
      !shippingAddress ||
      !shippingCity ||
      !postalCode ||
      !phoneNumber
    ) {
      setError("Alla fält måste fyllas i.");
      return;
    }

    const cartId = getCartIdFromLocalstorage();
    if (!cartId) {
      setError("Kundvagn saknas.");
      return;
    }

    // Bygg customer-objektet
    const customer = {
      firstName,
      lastName,
      email,
      shippingAddress,
      shippingCity,
      postalCode,
      phoneNumber,
    };

    // Bygg order-objektet utan id och payment
    const newOrder = {
      cart: { id: cartId },
      customer,
    };

    // Skapa order i backend med try catch
    try {
      const createdOrder = await fetchCreateOrder(newOrder, cartId);
      setOrderIdToLocalstorage(createdOrder.id);
      setSuccess("Order skapad med ID: " + createdOrder.id);
      if (createdOrder && createdOrder.id) {
        // Skapa payment direkt med orderId från backend
        const paymentResult = await fetchCreatePayment(createdOrder.id);
        if (paymentResult && paymentResult.url) {
          console.log("Payment created:", paymentResult);
          window.location.href = paymentResult.url;
        }
        setPayment(paymentResult ?? null);
        console.log("Payment created:", paymentResult);
      }
    } catch (err) {
      setError("Kunde inte skapa order. Försök igen.");
    }
  };

  return (
    <Form>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {success && (
        <div style={{ color: "green", marginBottom: 10 }}>{success}</div>
      )}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>Förnamn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange förnamn"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Efternamn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange efternamn"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ange email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridShippingAddress">
          <Form.Label>Leveransadress</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange leveransadress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPostalCode">
          <Form.Label>Postnummer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange postnummer"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridShippingCity">
          <Form.Label>Stad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange stad"
            value={shippingCity}
            onChange={(e) => setShippingCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhoneNumber">
          <Form.Label>Telefonnummer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ange telefonnummer"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Button type="button" onClick={handleCostumerInfo}>
        Betala
      </Button>
    </Form>
  );
}
export default CostumerInformation;
