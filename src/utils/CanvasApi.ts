import axios from "axios";
import type { Canvas, KawaiiResponse } from "./Interfaces";

// API endpoint för canvas hämta alla tavlor och hämta tavla via ID
const CANVAS_API =
   window.location.hostname === "localhost"
   ?"http://localhost:8080/api/canvas"
   : "https://kawaiicanvasapi.onrender.com/api/canvas";

export async function fetchGetAllCanvas() {
  try {
    const rep = await axios.get<KawaiiResponse<Canvas[]>>(`${CANVAS_API}`);
    return rep.data.data;
  } catch (error) {
    console.error("Error fetching canvas data:", error);
    throw error;
  }
}

export async function fetchGetCanvasById(id: string) {
  try {
    const rep = await axios.get<KawaiiResponse<Canvas>>(`${CANVAS_API}/${id}`);
    return rep.data.data;
  } catch (error) {
    console.error("Error fetching canvas by ID:", error);
    throw error;
  }
}
