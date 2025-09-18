import { useState } from "react";
import { useAuth } from "@/context/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, anonymous } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
      <p className="text-sm text-muted-foreground mb-6">Use email to sign in or continue anonymously.</p>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault(); setLoading(true); setError("");
        try { await login(email, password); nav("/"); } catch (e) { setError(e?.message || "Login failed"); } finally { setLoading(false); }
      }}>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border px-3 py-2" />
        {error && <div className="text-sm text-destructive">{error}</div>}
        <button disabled={loading} className="w-full rounded-md bg-primary text-primary-foreground px-4 py-2 font-semibold disabled:opacity-50">Sign in</button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={async () => { await anonymous(); nav("/"); }} className="rounded-md border px-4 py-2 text-sm">Continue anonymously</button>
      </div>
    </div>
  );
}
