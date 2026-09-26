import { useEffect, useState } from "react";
import { adminApi } from "./adminApi";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "in-progress", "completed", "cancelled"];

export default function RequestsPanel() {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [b, m] = await Promise.all([adminApi.listBookings(), adminApi.listMessages()]);
      setBookings(b.bookings);
      setMessages(m.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id, status) {
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    try {
      await adminApi.updateBookingStatus(id, status);
    } catch (err) {
      setError(err.message);
      load(); // revert to server truth if the update failed
    }
  }

  if (loading) return <p className="text-chrome">Loading requests…</p>;

  return (
    <div className="space-y-12">
      {error && <p className="text-sm font-medium text-rust">{error}</p>}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-cream">
            Service requests ({bookings.length})
          </h2>
          <button onClick={load} className="focus-ring text-sm text-chrome underline">
            Refresh
          </button>
        </div>

        <div className="mt-4 overflow-x-auto border border-steel">
          <table className="w-full min-w-[720px] text-left text-sm text-cream">
            <thead className="bg-steel text-chrome">
              <tr>
                <th className="px-3 py-2">Received</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Service</th>
                <th className="px-3 py-2">Car</th>
                <th className="px-3 py-2">Preferred</th>
                <th className="px-3 py-2">Notes</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-steel align-top">
                  <td className="px-3 py-2 whitespace-nowrap text-chrome">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">{b.customerName}</td>
                  <td className="px-3 py-2">
                    <a href={`tel:${b.phone}`} className="underline">
                      {b.phone}
                    </a>
                  </td>
                  <td className="px-3 py-2">{b.serviceType}</td>
                  <td className="px-3 py-2">
                    {[b.carMake, b.carModel, b.carYear].filter(Boolean).join(" ") || "—"}
                    {b.plateNumber ? ` · ${b.plateNumber}` : ""}
                  </td>
                  <td className="px-3 py-2">
                    {b.preferredDate ? new Date(b.preferredDate).toLocaleDateString() : "Any date"}
                    {" · "}
                    {b.preferredTimeSlot}
                    {" · "}
                    {b.dropOffType}
                  </td>
                  <td className="px-3 py-2 max-w-xs text-chrome">{b.notes || "—"}</td>
                  <td className="px-3 py-2">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="border border-chrome/30 bg-asphalt px-2 py-1 text-cream focus-ring"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-chrome">
                    No service requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-cream">
          Contact messages ({messages.length})
        </h2>

        <div className="mt-4 space-y-3">
          {messages.map((m) => (
            <div key={m._id} className="border-l-4 border-sunflower bg-steel p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-chrome">
                <span className="font-semibold text-cream">{m.name}</span>
                <span>{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-sm text-chrome">
                {[m.phone, m.email].filter(Boolean).join(" · ") || "No contact info given"}
              </p>
              <p className="mt-2 text-cream">{m.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-chrome">No messages yet.</p>}
        </div>
      </section>
    </div>
  );
}
