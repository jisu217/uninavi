import React from "react";
import "./chat.css";

export default function ChatbotButton() {
  const open = () => window.dispatchEvent(new CustomEvent("chatbot:toggle"));
  return (
    <button className="chatbot-button" aria-label="유니나비 도우미" onClick={open} title="도우미">
      <span className="chatbot-button-icon">🤖</span>
    </button>
  );
}