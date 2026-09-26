import { useState } from "react";
import { adminApi } from "./adminApi";

export default function LoginForm({ onLoggedIn }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminApi.login(password);
      onLoggedIn();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-asphalt px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border-l-4 border-sunflower bg-steel p-6">
        <h1 className="font-display text-2xl font-semibold text-cream">Sunflower Garage — Staff</h1>
        <p className="mt-1 text-sm text-chrome">Log in to view requests and manage the gallery.</p>

        <label className="mt-5 block">
          <span className="text-sm text-chrome">Password</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-chrome/30 bg-asphalt px-3 py-2 text-cream focus-ring"
          />
        </label>

        {error && <p className="mt-3 text-sm font-medium text-rust">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-5 w-full rounded-sm bg-sunflower px-4 py-2 font-display text-lg font-semibold text-asphalt disabled:opacity-60"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
