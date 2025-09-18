import { useMemo, useState } from "react";
import TherapistCard from "@/components/app/TherapistCard";

const ALL_THERAPISTS = [
  { id: "t1", name: "Dr. Maya Patel", specialty: "CBT", languages: ["en", "hi"], price: 90, rating: 4.9, availability: "Mon-Fri" },
  { id: "t2", name: "Alex Kim, LMFT", specialty: "Couples", languages: ["en", "ko"], price: 120, rating: 4.7, availability: "Weekends" },
  { id: "t3", name: "Sofia García", specialty: "Trauma", languages: ["en", "es"], price: 75, rating: 4.8, availability: "Evenings" },
  { id: "t4", name: "Noah Johnson", specialty: "Anxiety", languages: ["en"], price: 65, rating: 4.6, availability: "Flexible" },
];

export default function Directory() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [language, setLanguage] = useState("all");
  const [price, setPrice] = useState(200);

  const filtered = useMemo(() => {
    return ALL_THERAPISTS.filter((t) => {
      if (specialty !== "all" && t.specialty !== specialty) return false;
      if (language !== "all" && !t.languages.includes(language)) return false;
      if (t.price > price) return false;
      if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, specialty, language, price]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight mb-2">Therapist Directory</h1>
      <p className="text-sm text-muted-foreground mb-6">Search approved therapists. Filter by specialty, language, and price. Book and start a secure chat.</p>

      <div className="grid gap-4 rounded-xl border p-4 bg-card">
        <div className="grid sm:grid-cols-4 gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" className="col-span-2 rounded-md border px-3 py-2" aria-label="Search therapists" />
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="rounded-md border px-3 py-2" aria-label="Filter by specialty">
            <option value="all">All specialties</option>
            <option value="CBT">CBT</option>
            <option value="Couples">Couples</option>
            <option value="Trauma">Trauma</option>
            <option value="Anxiety">Anxiety</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-md border px-3 py-2" aria-label="Filter by language">
            <option value="all">Any language</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="hi">हिंदी</option>
            <option value="ko">한국어</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="price" className="text-sm text-muted-foreground">Max price ${price}</label>
          <input id="price" type="range" min={40} max={200} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (<TherapistCard key={t.id} therapist={t} />))}
        {filtered.length === 0 && (<div className="col-span-full rounded-xl border p-6 text-center text-sm text-muted-foreground">No therapists match the filters.</div>)}
      </div>
    </div>
  );
}
