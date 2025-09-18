export const anonymousAuth = (_req, res) => {
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  res.json({ token, expiresIn: 3600 });
};

export const paymentCheckout = (req, res) => {
  const { plan = "session" } = req.body ?? {};
  res.json({ id: "pay_" + Math.random().toString(36).slice(2), plan, status: "requires_confirmation" });
};

export const uploadPresign = (req, res) => {
  const { mime = "image/png" } = req.body ?? {};
  res.json({ url: "/api/upload/echo", fields: { key: `uploads/${Date.now()}.bin`, contentType: mime } });
};

export const uploadEcho = (_req, res) => {
  res.json({ ok: true });
};

export const login = (req, res) => {
  const { email = "", password = "" } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") return res.status(400).json({ error: "Invalid" });
  const isAdmin = email.toLowerCase() === "admin@local" && password.length >= 3;
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const user = { id: (isAdmin ? "admin-" : "user-") + token.slice(0, 6), email, role: (isAdmin ? "admin" : "user"), token };
  res.json({ user });
};

export const listTherapists = (req, res) => {
  const all = [
    { id: "t1", name: "Dr. Maya Patel", specialty: "CBT", languages: ["en", "hi"], price: 90, rating: 4.9, availability: "Mon-Fri" },
    { id: "t2", name: "Alex Kim, LMFT", specialty: "Couples", languages: ["en", "ko"], price: 120, rating: 4.7, availability: "Weekends" },
    { id: "t3", name: "Sofia García", specialty: "Trauma", languages: ["en", "es"], price: 75, rating: 4.8, availability: "Evenings" },
    { id: "t4", name: "Noah Johnson", specialty: "Anxiety", languages: ["en"], price: 65, rating: 4.6, availability: "Flexible" },
  ];
  const { specialty, language, maxPrice } = req.query || {};
  let result = all;
  if (specialty) result = result.filter((t) => t.specialty === specialty);
  if (language) result = result.filter((t) => t.languages.includes(language));
  if (maxPrice) result = result.filter((t) => t.price <= Number(maxPrice));
  res.json(result);
};
