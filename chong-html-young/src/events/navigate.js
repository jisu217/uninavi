// src/events/navigate.js
export function dispatchNavigate(detail) {
  window.dispatchEvent(new CustomEvent("chatbot:navigate", { detail }));
}