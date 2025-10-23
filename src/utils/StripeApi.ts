import axios from "axios";
import type { KawaiiResponse, Payment } from "./Interfaces";


const BASE_URL = "http://localhost:8080/api/payments";

export async function fetchCreatePayment(orderId:string) {
     if (!orderId) {
    console.error("Order ID saknas.");
    return null;
  }
    try{
        const rep = await axios.post<KawaiiResponse<Payment>>(`${BASE_URL}?orderId=${orderId}`, {}, { withCredentials: true });
        return rep.data.data;

    }catch(err){
        console.error("Error creating payment:", err);
    }

}