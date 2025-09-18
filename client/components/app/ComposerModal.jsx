import { useEffect, useRef, useState } from "react";

export default function ComposerModal({ open, onClose, onSubmit }) {
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [visibility, setVisibility] = useState("public");
  const ref = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => ref.current?.focus(), 50);
    if (!open) { setContent(""); setAnonymous(true); setVisibility("public"); }
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl border bg-background p-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Share a thought</h3>
        <textarea ref={ref} value={content} onChange={(e) => setContent(e.target.value)} rows={5} placeholder="What's on your mind?" className="w-full resize-y rounded-md border p-3" />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label className="inline-flex items-center gap-2"><input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />Post anonymously</label>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="rounded-md border px-3 py-1.5">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <div className="ml-auto flex gap-2">
            <button onClick={onClose} className="rounded-md border px-4 py-2">Cancel</button>
            <button onClick={() => content.trim() && onSubmit({ content: content.trim(), anonymous, visibility })} className="rounded-md bg-primary text-primary-foreground px-4 py-2 font-semibold disabled:opacity-50" disabled={!content.trim()}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
