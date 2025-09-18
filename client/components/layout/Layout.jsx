import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon, Globe2, MessageCircleHeart } from "lucide-react";
import { useAuth } from "@/context/auth/AuthProvider";

const baseNav = [
  { to: "/", label: "Home" },
  { to: "/feed", label: "Feed" },
  { to: "/journal", label: "Journal" },
  { to: "/directory", label: "Therapists" },
  { to: "/profile", label: "Profile" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);
  return (
    <button aria-label="Toggle theme" onClick={() => setDark((v) => !v)} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-accent/50">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

function LanguageSwitcher() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
      <Globe2 size={16} />
      <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent outline-none">
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
}

function CookieConsent() {
  const [accepted, setAccepted] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("cookie-consent") === "true";
  });
  if (accepted) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-5xl rounded-t-2xl border bg-background p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <p className="text-sm text-muted-foreground">We use strictly necessary cookies for security and preferences. No tracking by default. You can opt-in to analytics in Profile.</p>
        <div className="flex gap-2">
          <button onClick={() => { localStorage.setItem("cookie-consent", "true"); setAccepted(true); }} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Accept</button>
          <Link to="/profile" className="rounded-md border px-4 py-2 text-sm">Settings</Link>
        </div>
      </div>
    </div>
  );
}

function AuthButtons() {
  const { user, logout } = useAuth();
  if (!user) return <Link to="/login" className="rounded-full border px-3 py-1.5 text-sm">Login</Link>;
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{user.email || user.id}</span>
      <button onClick={logout} className="rounded-full border px-3 py-1.5 text-sm">Logout</button>
    </div>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const navItems = user?.role === "admin" ? [...baseNav, { to: "/admin", label: "Admin" }] : baseNav;
  useEffect(() => setMobileOpen(false), [location.pathname]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="sm:hidden" aria-label="Toggle navigation" onClick={() => setMobileOpen((v) => !v)}>
              <span className="block h-0.5 w-5 bg-foreground mb-1" />
              <span className="block h-0.5 w-5 bg-foreground mb-1" />
              <span className="block h-0.5 w-5 bg-foreground" />
            </button>
            <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-xl">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-400 text-primary-foreground">
                <MessageCircleHeart size={16} />
              </span>
              AuraMind
            </Link>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/60 ${location.pathname === n.to ? "bg-accent/60" : ""}`}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <AuthButtons />
          </div>
        </div>
        {mobileOpen && (
          <div className="sm:hidden border-t">
            <nav className="px-4 py-2 grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <Link key={n.to} to={n.to} className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/60 ${location.pathname === n.to ? "bg-accent/60" : ""}`}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t mt-16">
        <div className="mx-auto max-w-7xl px-4 py-10 grid sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AuraMind. Privacy-first therapy & journaling platform.</p>
          <div className="flex gap-4 sm:justify-end">
            <Link to="/profile" className="hover:text-foreground">Privacy</Link>
            <a href="/robots.txt" className="hover:text-foreground">Robots</a>
            <a href="https://builder.io/c/docs/projects" target="_blank" rel="noreferrer" className="hover:text-foreground">Docs</a>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
