import axios from "axios";
import type { Canvas, KawaiiResponse } from "./Interfaces";

const BASE_URL = "http://localhost:8080/api/canvas";

export async function fetchGetAllCanvas() {
  try {
    const rep = await axios.get<KawaiiResponse<Canvas[]>>(`${BASE_URL}`);
    return rep.data.data;
  } catch (error) {
    console.error("Error fetching canvas data:", error);
    throw error;
  }
}
