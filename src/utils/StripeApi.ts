
import axios from "axios";
import type { KawaiiResponse, Order,Payment} from "./Interfaces";

// fetchar payment från backend skapa betalning och hämta betalningsstatus
// Välj API-url automatiskt beroende på miljö
const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:8080/api/payments" // Lokal utveckling
        : "https://kawaiicanvasapi.onrender.com/api/payments"; // Produktion

export async function fetchCreatePayment(orderId:string) {
     if (!orderId) {
    console.error("Order ID saknas.");
    return null;
  }
    try{
      const rep = await axios.post<KawaiiResponse<Payment>>(`${API_URL}?orderId=${orderId}`);
        return rep.data.data;

    }catch(err){
        console.error("Error creating payment:", err);
    }

}

export async function fetchGetPaymentStatus(sessionId: string): Promise<Order | undefined> {
  try{
    const rep = await axios.get<KawaiiResponse<Order>>(`${API_URL}/success?sessionId=${sessionId}`);
    return rep.data.data;

  }catch(err){
    console.error("Error fetching payment status:", err);
  }
}