import axios from "axios";
import type { KawaiiResponse, Order, NewOrder } from "./Interfaces";

const BASE_URL = "http://localhost:8080/api/orders";


export async function fetchCreateOrder(NewOrder: NewOrder, cartId: string) {
    try {
        const rep = await axios.post<KawaiiResponse<Order>>(
            `${BASE_URL}/${cartId}`,
            NewOrder,
            { withCredentials: true }
        );
        return rep.data.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}
  