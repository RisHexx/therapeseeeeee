import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthCtx = createContext({ user: null, loading: true, login: async () => {}, anonymous: async () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("am-auth");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  async function login(email, password) {
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("am-auth", JSON.stringify(data.user));
  }

  async function anonymous() {
    const res = await fetch("/api/auth/anonymous", { method: "POST" });
    const data = await res.json();
    const anon = { id: "anon-" + data.token.slice(0, 6), role: "user", token: data.token };
    setUser(anon);
    localStorage.setItem("am-auth", JSON.stringify(anon));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("am-auth");
  }

  const value = useMemo(() => ({ user, loading, login, anonymous, logout }), [user, loading]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
