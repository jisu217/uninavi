import React from "react";
import "./chat.css";

export default function ChatMessage({ role = "bot", children }) {
  const cls = role === "user" ? "bubble bubble-user" : "bubble bubble-bot";
  return (
    <div className={`row ${role}`}>
      <div className={cls}>{children}</div>
    </div>
  );
} 