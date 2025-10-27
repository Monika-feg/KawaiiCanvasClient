import { useEffect, useState } from "react";
import "./css/Bot.css";
import { fetchBot } from "../utils/BotApi";
import { ChatBotResponseEnum } from "../utils/Interfaces";

const BotURL =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761573747/strawberry-9537982_640_ha9afx.png";

function BotComponent() {
  const [input, setInput] = useState("");
  // Remove response state, use botReply for all bot output
  const [botReply, setBotReply] = useState<string>("");

  useEffect(() => {
    setBotReply(
      "Hej! Jag är Kawaii Bot, din virtuella assistent för allt som rör Kawaii Canvas. Hur kan jag hjälpa dig idag?, Jag kan svara på frågor gällande leverans, betalning och retur"
    );
  }, []);

  const handleClientAnswer = async () => {
    if (!input.trim()) return;

    const inputLower = input.toLowerCase();
    let systemPrompt = "";

    if (inputLower.includes("leverans"))
      systemPrompt = ChatBotResponseEnum.LEVERANCE;
    else if (inputLower.includes("retur"))
      systemPrompt = ChatBotResponseEnum.RETURNS;
    else if (inputLower.includes("betalning"))
      systemPrompt = ChatBotResponseEnum.PAYING;
    else if (inputLower.includes("kontakt"))
      systemPrompt = ChatBotResponseEnum.CONTACT;

    try {
      const res = await fetchBot(input, systemPrompt);
      setBotReply(res && res.trim() ? res : "Jag förstår inte din fråga.");
      setInput("");
    } catch (error) {
      setBotReply("Jag förstår inte din fråga.");
      console.error("Något gick fel:", error);
    }
  };

  return (
    <div className="bot-container">
      <div className="speech-bubble">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv din fråga här..."
        />
        <br />
        <button className="bot-button" onClick={handleClientAnswer}>
          Skicka
        </button>
        <div className="bot-reply">
          <strong>Bot:</strong> {botReply}
        </div>
      </div>
      <img src={BotURL} alt="Bot" className="bot-img-small" />
    </div>
  );
}
export default BotComponent;
