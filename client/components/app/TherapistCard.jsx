import { useState } from "react";
import ChatWindow from "@/components/app/ChatWindow";

export default function TherapistCard({ therapist }) {
  const [chat, setChat] = useState(false);
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold leading-tight">{therapist.name}</h3>
          <p className="text-sm text-muted-foreground">{therapist.specialty} · {therapist.languages.join(", ")}</p>
        </div>
        <div className="text-right">
          <div className="text-sm">${therapist.price}/session</div>
          <div className="text-xs text-muted-foreground">⭐ {therapist.rating}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{therapist.availability}</span>
        <div className="flex gap-2">
          <button className="rounded-md border px-3 py-1.5" onClick={() => alert("Booking stub: session reserved!")}>Book</button>
          <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5" onClick={() => setChat(true)}>Chat</button>
        </div>
      </div>
      <ChatWindow open={chat} onClose={() => setChat(false)} peerName={therapist.name} />
    </div>
  );
}
