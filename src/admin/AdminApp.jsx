import { useEffect, useState } from "react";
import { adminApi } from "./adminApi";
import LoginForm from "./LoginForm";
import RequestsPanel from "./RequestsPanel";
import GalleryPanel from "./GalleryPanel";

const TABS = [
  { id: "requests", label: "Requests" },
  { id: "gallery", label: "Gallery" },
];

export default function AdminApp() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState("requests");

  useEffect(() => {
    adminApi
      .me()
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false))
      .finally(() => setAuthChecked(true));
  }, []);

  async function handleLogout() {
    await adminApi.logout().catch(() => {});
    setAuthenticated(false);
  }

  if (!authChecked) {
    return (
      <div className="grid min-h-screen place-items-center bg-asphalt text-chrome">
        Loading…
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLoggedIn={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-asphalt pb-16">
      <header className="border-b border-steel px-5 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-cream">
            Sunflower Garage — Staff dashboard
          </h1>
          <button onClick={handleLogout} className="focus-ring text-sm text-chrome underline">
            Log out
          </button>
        </div>

        <nav className="mx-auto mt-4 flex max-w-5xl gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`focus-ring px-4 py-2 font-display text-lg ${
                tab === t.id
                  ? "bg-sunflower text-asphalt"
                  : "bg-steel text-chrome hover:text-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto mt-8 max-w-5xl px-5">
        {tab === "requests" ? <RequestsPanel /> : <GalleryPanel />}
      </main>
    </div>
  );
}
