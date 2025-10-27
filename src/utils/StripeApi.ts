
import axios from "axios";
import type { KawaiiResponse, Payment } from "./Interfaces";

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