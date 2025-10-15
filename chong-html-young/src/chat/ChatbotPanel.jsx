import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import ChatMessage from "./ChatMessage";

export default function ChatbotPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "무엇을 도와드릴까요? 예) ai융합실습실 어디야? / 천마홀 어디야?" },
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    window.addEventListener("chatbot:toggle", onToggle);
    window.addEventListener("chatbot:open", onOpen);
    window.addEventListener("chatbot:close", onClose);
    return () => {
      window.removeEventListener("chatbot:toggle", onToggle);
      window.removeEventListener("chatbot:open", onOpen);
      window.removeEventListener("chatbot:close", onClose);
    };
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages, loading]);

  async function handleSend(e) {
    e?.preventDefault?.();
    const t = text.trim();
    if (!t || loading) return;

    setMessages((m) => [...m, { role: "user", text: t }]);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t }),
      });
      const data = await res.json().catch(() => null);
      const reply =
        data?.message ??
        "죄송해요. 잠시 이해하지 못했어요. 예) 종합실습실 어디야?";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch (e2) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "요청 중 오류가 발생했어요. 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="chatbot-wrap" role="dialog" aria-label="유니나비 도우미">
      <header className="chatbot-header">
        <div className="chatbot-title">유니나비 도우미</div>
        <button
          className="chatbot-close"
          onClick={() => window.dispatchEvent(new CustomEvent("chatbot:close"))}
        >
          ×
        </button>
      </header>

      <div className="chatbot-body" ref={listRef}>
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role}>
            {m.text}
          </ChatMessage>
        ))}
        {loading && <ChatMessage role="bot">생각 중…</ChatMessage>}
      </div>

      <form className="chatbot-footer" onSubmit={handleSend}>
        <input
          className="chatbot-input"
          placeholder="예) 강의실 위치, 학교 정보"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="chatbot-send" type="submit" disabled={loading}>
          보내기
        </button>
      </form>
    </div>
  );
}