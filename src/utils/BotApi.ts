import axios from "axios";
import type { KawaiiResponse } from "./Interfaces";

const API_URL = "http://localhost:8080";

export async function fetchBot(prompt: string, systemPrompt:string) {
       try {
        const rep = await axios.post<KawaiiResponse<string>>(
            `${API_URL}/bot`,
            { prompt, systemPrompt },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return rep.data.data;
    } catch (error) {
        console.error("Error fetching bot response:", error);
        throw error;
    }
}
