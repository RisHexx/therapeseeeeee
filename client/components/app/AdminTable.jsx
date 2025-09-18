import { useState } from "react";

const flaggedContent = [
  { id: "p3", type: "post", reason: "self-harm mention", excerpt: "I don't see a way out..." },
  { id: "p7", type: "comment", reason: "abusive language", excerpt: "You're worthless" },
];

export default function AdminTable() {
  const [rows, setRows] = useState(flaggedContent);
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-foreground/80">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Type</th>
            <th className="px-3 py-2 text-left">Reason</th>
            <th className="px-3 py-2 text-left">Excerpt</th>
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="px-3 py-2 font-mono">{r.id}</td>
              <td className="px-3 py-2 capitalize">{r.type}</td>
              <td className="px-3 py-2">{r.reason}</td>
              <td className="px-3 py-2">{r.excerpt}</td>
              <td className="px-3 py-2 text-right space-x-2">
                <button className="rounded-md border px-2 py-1" onClick={() => setRows((cur) => cur.filter((x) => x.id !== r.id))}>Remove</button>
                <button className="rounded-md bg-primary text-primary-foreground px-2 py-1" onClick={() => alert("Approved and restored")}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
