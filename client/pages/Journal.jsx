import JournalEditor from "@/components/app/JournalEditor";
import MoodWidget from "@/components/app/MoodWidget";
import JournalList from "@/components/app/JournalList";

export default function Journal() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Journal</h1>
        <p className="text-sm text-muted-foreground">Private entries only you can see. Track your mood over time.</p>
      </div>
      <JournalEditor onSaved={() => {}} />
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Your Entries</h2>
        <JournalList />
      </div>
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Mood Tracker</h2>
        <MoodWidget />
      </div>
    </div>
  );
}
