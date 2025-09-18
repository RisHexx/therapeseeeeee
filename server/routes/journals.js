import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.resolve("server/data");
const FILE = path.resolve(DATA_DIR, "journals.json");

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(FILE).catch(async () => { await fs.writeFile(FILE, JSON.stringify([]), "utf8"); });
  } catch (e) {}
}

async function readAll() {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf8");
  try { const arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; } catch { return []; }
}

async function writeAll(entries) {
  await ensureFile();
  await fs.writeFile(FILE, JSON.stringify(entries, null, 2), "utf8");
}

export const getJournals = async (req, res) => {
  const userId = String(req.header("x-user-id") || "anon");
  const all = await readAll();
  const mine = all.filter((e) => e.userId === userId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json(mine);
};

export const createJournal = async (req, res) => {
  const userId = String(req.header("x-user-id") || "anon");
  const { content } = req.body || {};
  if (typeof content !== "string" || !content.trim()) return res.status(400).json({ error: "Content required" });
  const entry = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), userId, content: content.trim(), createdAt: new Date().toISOString() };
  const all = await readAll();
  all.push(entry);
  await writeAll(all);
  res.status(201).json(entry);
};

export const deleteJournal = async (req, res) => {
  const userId = String(req.header("x-user-id") || "anon");
  const { id } = req.params;
  const all = await readAll();
  const exists = all.find((e) => e.id === id && e.userId === userId);
  if (!exists) return res.status(404).json({ error: "Not found" });
  const next = all.filter((e) => !(e.id === id && e.userId === userId));
  await writeAll(next);
  res.json({ ok: true });
};
