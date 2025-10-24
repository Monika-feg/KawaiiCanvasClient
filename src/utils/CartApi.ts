import axios from "axios";
import type { KawaiiResponse, Cart } from "./Interfaces";

const CART_API =
    window.location.hostname === "localhost"
        ? "http://localhost:8080/api/cart"
        : "https://kawaiicanvasapi.onrender.com/api/cart";

// skapar en ny cart när användaren besöker sidan första gången
export async function fetchNewCart() {
  try {
    const rep = await axios.post<KawaiiResponse<Cart>>(
      `${CART_API}/newCart`,
      {},
      { withCredentials: true }
    );
    return rep.data.data;
  } catch (error) {
    console.error("Error creating new cart:", error);
    throw error;
  }
}

// lägger till en canvas i kundvagnen
export async function fetchAddCanvasToCart(cartId: string, canvasId: string, quantity: number) {
   console.log("cartId:", cartId, "canvasId:", canvasId, "quantity:", quantity);
  try {
    const rep = await axios.patch<KawaiiResponse<Cart>>(
      `${CART_API}/${cartId}/canvas/${canvasId}?quantity=${quantity}`,
      { },
      { withCredentials: true }
    );
    return rep.data.data;
  } catch (error) {
    console.error("Error adding canvas to cart:", error);
    throw error;
  }
}

// hämtar kundvagnen med dess innehåll
export async function fetchGetCartById(id: string) {
  try {
    const rep = await axios.get<KawaiiResponse<Cart>>(`${CART_API}/${id}`, {
      withCredentials: true,
    });
    return rep.data.data;
  } catch (error) {
    console.error("Error fetching cart by ID:", error);
    throw error;
  }
}

// ta bort en canvas från kundvagnen
export async function fetchRemoveCanvasFromCart(
  cartId: string,
  canvasId: string
) {
  try {
    const rep = await axios.delete<KawaiiResponse<Cart>>(
      `${CART_API}/${cartId}/canvas/${canvasId}`,
      {
        withCredentials: true,
      }
    );
    return rep.data.data;
  } catch (error) {
    console.error("Error removing canvas from cart:", error);
    throw error;
  }
}

// totalpris för kundvagnen
export async function fetchGetCartTotalPrice(cartId: string) {
  try {
    const rep = await axios.get<KawaiiResponse<number>>(
      `${CART_API}/${cartId}/totalPrice`,
      {
        withCredentials: true,
      }
    );
    return rep.data.data;
  } catch (error) {
    console.error("Error fetching cart total price:", error);
    throw error;
  }
}
