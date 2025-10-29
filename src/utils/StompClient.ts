
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// websocket endpoint för stock uppdateringar
const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:8080/ws"
    : "https://kawaiicanvasapi.onrender.com/ws";

export const StompClient = new Client({
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    webSocketFactory() {
        return new SockJS(BASE_URL);
    },
});