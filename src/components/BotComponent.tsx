import { useState, useEffect, useRef } from "react";
import "./css/Bot.css";
import { fetchBot } from "../utils/BotApi";
import { BotQuickReplies } from "../utils/BotQuickReplies";

const BotURL =
  "https://res.cloudinary.com/dlhqajdjy/image/upload/v1761573747/strawberry-9537982_640_ha9afx.png";

function BotComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hej! Jag är Kawaii Bot, din virtuella assistent för allt som rör Kawaii Canvas. Hur kan jag hjälpa dig idag? Jag kan svara på frågor gällande leverans, betalning, retur och kontakt.",
    },
  ]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAutoWelcome, setShowAutoWelcome] = useState(false);
  // Visa välkomstbubbla automatiskt när sidan laddas
  useEffect(() => {
    setShowAutoWelcome(true);
    const timer = setTimeout(() => setShowAutoWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  const [showChat, setShowChat] = useState(false);

  // Ref for scrolling chat to bottom
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (showChat && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showChat]);

  const handleClientAnswer = async () => {
    if (!input.trim()) return;

    const inputLower = input.toLowerCase();
    setInput("");

    // Fuzzy match med plural och böjningar
    if (inputLower.match(/leverans(er|erna)?|levernans|levernas|levarans/)) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: BotQuickReplies.leverans },
      ]);
      return;
    }
    if (inputLower.match(/retur(er|erna)?|returr|retuer|retuur/)) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: BotQuickReplies.retur },
      ]);
      return;
    }
    if (
      inputLower.match(
        /betalning(ar|arna)?|betalar|betala|betlaning|betaning|betalnig/
      )
    ) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: BotQuickReplies.betalning },
      ]);
      return;
    }
    if (inputLower.match(/kontakt(er|erna)?|kontatk|kontak/)) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: BotQuickReplies.kontakt },
      ]);
      return;
    }

    // Om ingen fuzzy matchning, skicka till backend
    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    try {
      const res = await fetchBot(input, "");
      const botMessage = {
        sender: "bot",
        text: res?.trim() || "Jag förstår inte din fråga.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = { sender: "bot", text: "Jag förstår inte din fråga." };
      setMessages((prev) => [...prev, botMessage]);
      console.error("Något gick fel:", error);
    }
  };

  return (
    <div className="bot-container">
      <div
        style={{ position: "relative", display: "inline-block" }}
        onMouseEnter={() => setShowWelcome(true)}
        onMouseLeave={() => setShowWelcome(false)}
      >
        <img
          src={BotURL}
          alt="Bot"
          className="bot-img-small"
          style={{ cursor: "pointer" }}
          onClick={() => setShowChat((v) => !v)}
        />
        {(showWelcome || showAutoWelcome) && !showChat && (
          <div className="speech-bubble bot-welcome">
            Hej! Vad kan jag hjälpa dig med?
          </div>
        )}
      </div>
      {showChat && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`speech-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <textarea
            className="textarea-bot"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv din fråga här..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleClientAnswer();
              }
            }}
            rows={2}
          />
          <div className="bot-actions">
            <button className="bot-button" onClick={handleClientAnswer}>
              Skicka
            </button>
            <button
              className="bot-button"
              style={{ marginLeft: 8 }}
              onClick={() => setShowChat(false)}
              aria-label="Stäng chatten"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotComponent;
