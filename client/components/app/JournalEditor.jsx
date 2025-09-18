import { useState } from "react";
import { useAuth } from "@/context/auth/AuthProvider";

export default function JournalEditor({ onSaved }) {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(null);
  const { user } = useAuth();

  return (
    <div className="rounded-xl border p-4 bg-card">
      <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={8} placeholder="Write privately. Only you can see this." aria-label="Journal editor" className="w-full resize-y rounded-md border p-3" />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={async () => {
          const content = value.trim(); if (!content) return;
          const res = await fetch("/api/journals", { method: "POST", headers: { "content-type": "application/json", "x-user-id": user?.id || "anon" }, body: JSON.stringify({ content }) });
          if (res.ok) { const data = await res.json(); setSaved(new Date(data.createdAt).toLocaleString()); setValue(""); onSaved?.(); }
        }} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50" disabled={!value.trim()}>
          Save entry
        </button>
        {saved && <span className="text-sm text-muted-foreground">Saved at {saved}</span>}
      </div>
    </div>
  );
}
