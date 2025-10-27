import axios from "axios";
import type { KawaiiResponse, Order, NewOrder } from "./Interfaces";

const ORDER_API =
    window.location.hostname === "localhost"
        ? "http://localhost:8080/api/orders"
        : "https://kawaiicanvasapi.onrender.com/api/orders";


export async function fetchCreateOrder(NewOrder: NewOrder, cartId: string) {
    try {
        const rep = await axios.post<KawaiiResponse<Order>>(
            `${ORDER_API}/${cartId}`,
            NewOrder);
        return rep.data.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}

  export async function fetchGetOrderById(orderId: string) {
        try {
            const rep = await axios.get<KawaiiResponse<Order>>(
                `${ORDER_API}/${orderId}`);
            return rep.data.data;
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            throw error;
        }
    }
  