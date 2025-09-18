import { useState } from "react";
import ComposerModal from "@/components/app/ComposerModal";
import PostCard from "@/components/app/PostCard";

const initialPosts = [
  { id: "1", author: "anon-23", content: "Feeling overwhelmed today. Any tips for coping with Sunday scaries?", createdAt: new Date().toISOString(), reactions: { support: 12, hug: 8, insight: 3 }, comments: 4, public: true, flagged: false },
  { id: "2", author: "anon-7", content: "Therapy win: I asserted a boundary with a friend and it felt empowering!", createdAt: new Date().toISOString(), reactions: { support: 18, hug: 2, insight: 5 }, comments: 2, public: true, flagged: false },
];

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Community Feed</h1>
        <button onClick={() => setComposerOpen(true)} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Share Anonymously</button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Post publicly or anonymously. Be kind and follow community guidelines.</p>
      <div className="space-y-4">
        {posts.map((p) => (<PostCard key={p.id} post={p} onFlag={(id) => { setPosts((cur) => cur.map((x) => x.id === id ? { ...x, flagged: true } : x)); }} />))}
      </div>
      <ComposerModal open={composerOpen} onClose={() => setComposerOpen(false)} onSubmit={(draft) => {
        const newPost = { id: String(Date.now()), author: draft.anonymous ? `anon-${Math.floor(Math.random()*100)}` : "you", content: draft.content, createdAt: new Date().toISOString(), reactions: { support: 0, hug: 0, insight: 0 }, comments: 0, public: draft.visibility === "public", flagged: false };
        setPosts((cur) => [newPost, ...cur]);
        setComposerOpen(false);
      }} />
    </div>
  );
}
