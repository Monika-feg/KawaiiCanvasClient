import axios from "axios";
import type { KawaiiResponse, Cart } from "./Interfaces";

const BASE_URL = "http://localhost:8080/api/cart";

// skapar en ny cart när användaren besöker sidan första gången
export async function fetchNewCart() {
  try {
    const rep = await axios.post<KawaiiResponse<Cart>>(
      `${BASE_URL}/newCart`,
      {},
      { withCredentials: true }
    );
    return rep.data.data;
  } catch (error) {
    console.error("Error creating new cart:", error);
    throw error;
  }
}
