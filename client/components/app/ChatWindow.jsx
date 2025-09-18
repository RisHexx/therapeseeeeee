import { useEffect, useRef, useState } from "react";

export default function ChatWindow({ open, onClose, peerName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const url = (location.origin.replace("http", "ws") + "/socket");
    let ws = null;
    try {
      ws = new WebSocket(url);
      wsRef.current = ws;
      ws.onmessage = (ev) => { setMessages((m) => [...m, { id: Date.now(), from: peerName, text: String(ev.data) }]); };
    } catch (e) {}
    return () => { try { ws?.close(); } catch {} wsRef.current = null; };
  }, [open, peerName]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-4 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Chat with {peerName}</h3>
          <button onClick={onClose} className="rounded-md border px-2 py-1 text-sm">Close</button>
        </div>
        <div className="h-64 overflow-auto rounded-md border p-3 space-y-2 bg-card">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.from === "you" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
              <div className="text-[11px] opacity-70">{m.from}</div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>
        <form className="mt-3 flex items-center gap-2" onSubmit={(e) => {
          e.preventDefault(); const text = input.trim(); if (!text) return;
          setMessages((m) => [...m, { id: Date.now(), from: "you", text }]);
          try { wsRef.current?.send(text); } catch {}
          setInput("");
        }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-md border px-3 py-2" placeholder="Type a message" />
          <button className="rounded-md bg-primary text-primary-foreground px-3 py-2">Send</button>
        </form>
      </div>
    </div>
  );
}
