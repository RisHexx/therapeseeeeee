import { useEffect, useMemo, useState } from "react";
import ComposerModal from "@/components/app/ComposerModal";
import MoodWidget from "@/components/app/MoodWidget";
import { useAuth } from "@/context/auth/AuthProvider";

export default function Index() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  return (
    <div>
      <Hero onCompose={() => setOpen(true)} />
      <InteractivePanel />
      <WellbeingStrip />
      <ComposerModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (draft) => {
          const content = draft.content.trim();
          if (!content) return;
          if (draft.visibility === "private") {
            await fetch("/api/journals", {
              method: "POST",
              headers: { "content-type": "application/json", "x-user-id": user?.id || "anon" },
              body: JSON.stringify({ content }),
            });
          }
          setOpen(false);
        }}
      />
    </div>
  );
}

function Hero({ onCompose }) {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_-10%,hsl(var(--primary)/0.15),transparent),radial-gradient(1200px_600px_at_80%_-10%,hsl(var(--accent)/0.15),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-4">GDPR-ready · Anonymous by default · Mobile-first</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">Privacy-first therapy, journaling, and community support</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-prose">Share anonymously, track your mood, and connect with approved therapists. Your data stays yours.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onCompose} className="rounded-lg bg-primary text-primary-foreground px-5 py-3 font-semibold">Share Anonymously</button>
            <a href="/journal" className="rounded-lg border px-5 py-3 font-semibold">Open Journal</a>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">Reactions, comments, moderation flags, analytics opt-in, localization.</div>
        </div>
        <div className="rounded-2xl border bg-card/50 p-4 backdrop-blur">
          <h3 className="font-semibold mb-2">Mood this week</h3>
          <MoodWidget />
        </div>
      </div>
    </section>
  );
}

function InteractivePanel() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-2 gap-6">
      <MoodCheckIn />
      <QuickJournal />
    </section>
  );
}

function MoodCheckIn() {
  const [val, setVal] = useState(5);
  const today = useMemo(() => new Date().toLocaleDateString(undefined, { weekday: "short" }), []);
  return (
    <div className="rounded-2xl border p-5 bg-card">
      <h2 className="text-lg font-semibold">Daily Check‑in</h2>
      <p className="text-sm text-muted-foreground mb-4">How are you feeling today?</p>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{val}</span>
        <input aria-label="Mood from 1 to 10" type="range" min={1} max={10} value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full" />
      </div>
      <div className="mt-4 flex gap-2">
        {["😔","😕","😐","🙂","😄"].map((emoji, i) => (
          <button key={i} onClick={() => setVal(2*i+2)} className={`h-10 w-10 rounded-full border hover:bg-accent/60 ${val===2*i+2?"ring-2 ring-primary":""}`}>{emoji}</button>
        ))}
      </div>
      <button
        onClick={() => {
          const key = "moods";
          const arr = JSON.parse(localStorage.getItem(key) || "[]");
          const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
          const d = new Date();
          const entry = { day: days[d.getDay()===0?6:d.getDay()-1], mood: val };
          const next = [...arr.filter((x) => x.day !== entry.day), entry];
          localStorage.setItem(key, JSON.stringify(next));
        }}
        className="mt-4 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"
      >
        Save today’s mood ({today})
      </button>
    </div>
  );
}

function QuickJournal() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const count = text.trim().length;
  return (
    <div className="rounded-2xl border p-5 bg-card">
      <h2 className="text-lg font-semibold">Quick Journal</h2>
      <p className="text-sm text-muted-foreground mb-4">Private entry. Only you can see it.</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-md border p-3" placeholder="Write a few lines to clear your mind…" />
      <div className="mt-3 flex items-center gap-3">
        <button
          disabled={count===0||saving}
          onClick={async () => {
            setSaving(true);
            await fetch("/api/journals", { method: "POST", headers: { "content-type": "application/json", "x-user-id": user?.id || "anon" }, body: JSON.stringify({ content: text.trim() }) });
            setText("");
            setSaving(false);
          }}
          className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving?"Saving…":"Save entry"}
        </button>
        <span className="text-xs text-muted-foreground">{count} characters</span>
        <a href="/journal" className="ml-auto text-sm underline">Open full Journal</a>
      </div>
    </div>
  );
}

function WellbeingStrip() {
  const items = [
    { title: "Anonymous Posts", desc: "Share without revealing identity" },
    { title: "Mood Tracking", desc: "Visualize patterns over time" },
    { title: "Therapist Directory", desc: "Approved professionals with filters" },
    { title: "Moderation", desc: "Flags and admin review" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border p-4 bg-card hover:shadow-md transition-shadow">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-muted-foreground">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
