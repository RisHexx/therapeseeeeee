import { useState } from "react";
import { Flag, HeartHandshake, HandHeart, Lightbulb } from "lucide-react";

export default function PostCard({ post, onFlag }) {
  const [local, setLocal] = useState(post);
  function react(kind) { setLocal((p) => ({ ...p, reactions: { ...p.reactions, [kind]: p.reactions[kind] + 1 } })); }
  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <header className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-400 text-primary-foreground text-[10px] font-bold">{local.author.slice(0, 2).toUpperCase()}</span>
          <span>{local.public ? "public" : "anonymous"} · {new Date(local.createdAt).toLocaleString()}</span>
        </div>
        <button aria-label="Report content" onClick={() => onFlag?.(local.id)} className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 ${local.flagged ? "opacity-60" : "hover:bg-accent/60"}`} disabled={local.flagged}>
          <Flag size={14} />{local.flagged ? "Flagged" : "Flag"}
        </button>
      </header>
      <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{local.content}</p>
      <footer className="mt-3 flex items-center gap-2">
        <button onClick={() => react("support")} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-accent/60"><HeartHandshake size={14} /> Support {local.reactions.support}</button>
        <button onClick={() => react("hug")} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-accent/60"><HandHeart size={14} /> Hug {local.reactions.hug}</button>
        <button onClick={() => react("insight")} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-accent/60"><Lightbulb size={14} /> Insight {local.reactions.insight}</button>
      </footer>
    </article>
  );
}
