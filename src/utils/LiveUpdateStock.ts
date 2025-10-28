
import { useEffect, useState } from "react";
import { StompClient } from "./StompClient";
import type { Inventory } from "./Interfaces";



export function useLiveUpdateStock() {
    const [stock, setStock] = useState<Inventory[]>([]);

   useEffect(() => {
    StompClient.onConnect = () => {
      console.log("Stomp connected for live stock updates");

      StompClient.subscribe("/topic/stock", (message) => {
        const stockUpdate: Inventory = JSON.parse(message.body);
        setStock((prevStock) => {
          // Uppdatera stock-arrayen, t.ex. ersätt om itemId finns, annars lägg till
          const index = prevStock.findIndex(item => item.itemId === stockUpdate.itemId);
          if (index !== -1) {
            // Ersätt befintlig
            const updated = [...prevStock];
            updated[index] = stockUpdate;
            return updated;
          } else {
            // Lägg till ny
            return [...prevStock, stockUpdate];
          }
        });
      });
    };
    StompClient.activate();

    // Cleanup
    return () => {
      StompClient.deactivate();
    };
  }, []);

  return stock;
}