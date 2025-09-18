import { useState } from "react";

export default function Profile() {
  const [privateProfile, setPrivateProfile] = useState(true);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile & Privacy</h1>
        <p className="text-sm text-muted-foreground">Manage privacy, localization, and saved content.</p>
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Private profile</h3>
            <p className="text-sm text-muted-foreground">Hide your activity and name from others.</p>
          </div>
          <button aria-pressed={privateProfile} onClick={() => setPrivateProfile((v) => !v)} className={`h-8 w-12 rounded-full ${privateProfile ? "bg-primary" : "bg-muted"}`}>
            <span className={`block h-7 w-7 rounded-full bg-white transition ${privateProfile ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Analytics opt-in</h3>
            <p className="text-sm text-muted-foreground">Help us improve by sending anonymous usage data.</p>
          </div>
          <button aria-pressed={analyticsOptIn} onClick={() => setAnalyticsOptIn((v) => !v)} className={`h-8 w-12 rounded-full ${analyticsOptIn ? "bg-primary" : "bg-muted"}`}>
            <span className={`block h-7 w-7 rounded-full bg-white transition ${analyticsOptIn ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      </div>

      <div className="rounded-xl border p-4 space-y-3">
        <h2 className="font-semibold">Localization</h2>
        <select className="rounded-md border px-3 py-2 w-full max-w-xs" aria-label="Language">
          <option>English</option>
          <option>Español</option>
        </select>
      </div>
    </div>
  );
}
