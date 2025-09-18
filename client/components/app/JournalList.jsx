import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth/AuthProvider";

export default function JournalList() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/journals", { headers: { "x-user-id": user?.id || "anon" } });
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [user?.id]);

  if (loading) return <div className="text-sm text-muted-foreground">Loading journals…</div>;

  return (
    <div className="space-y-3">
      {items.map((e) => (
        <article key={e.id} className="rounded-lg border p-3">
          <div className="mb-1 text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleString()}</div>
          <p className="whitespace-pre-wrap leading-relaxed">{e.content}</p>
        </article>
      ))}
      {items.length === 0 && (<div className="rounded-lg border p-4 text-sm text-muted-foreground">No entries yet.</div>)}
    </div>
  );
}
