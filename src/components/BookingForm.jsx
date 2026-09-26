import { useState } from "react";
import { API_BASE_URL, GARAGE, telLink } from "../config";

const SERVICE_OPTIONS = [
  { value: "general-repair", label: "General repair & maintenance" },
  { value: "engine-diagnostics", label: "Engine diagnostics" },
  { value: "electrical-wiring", label: "Electrical & wiring" },
  { value: "brakes-suspension", label: "Brakes & suspension" },
  { value: "ac-service", label: "A/C service" },
  { value: "tyres-wheels", label: "Tyres & wheels" },
  { value: "supercar-specialist", label: "Supercar specialist bay" },
  { value: "roadside-assistance", label: "Roadside assistance" },
  { value: "other", label: "Something else" },
];

const EMPTY_FORM = {
  customerName: "",
  phone: "",
  email: "",
  serviceType: "",
  carMake: "",
  carModel: "",
  carYear: "",
  plateNumber: "",
  preferredDate: "",
  preferredTimeSlot: "any",
  dropOffType: "drop-off",
  notes: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not reach the server. Please call us instead.");
    }
  }

  return (
    <section id="booking" className="bg-cream py-20">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-4xl font-semibold text-asphalt">
          Book a service
        </h2>
        <p className="mt-3 text-steel">
          Tell us about your car and when suits you. We'll call or WhatsApp
          you to confirm — for anything urgent, call{" "}
          <a href={telLink()} className="font-semibold text-asphalt underline">
            {GARAGE.phoneDisplay}
          </a>{" "}
          directly.
        </p>

        <div className="stripe-divider my-8" />

        {status === "success" ? (
          <div className="border-l-4 border-sunflower bg-white p-6">
            <h3 className="font-display text-2xl font-semibold text-asphalt">
              Request received
            </h3>
            <p className="mt-2 text-steel">
              Thanks — we've logged your request and will contact you shortly
              to confirm a time.
            </p>
            <button
              className="focus-ring mt-4 text-sm font-semibold text-asphalt underline"
              onClick={() => setStatus("idle")}
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Your name" required>
              <input
                type="text"
                required
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Phone number" required>
              <input
                type="tel"
                required
                placeholder="+971 5X XXX XXXX"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Email (optional)">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="What does it need?" required>
              <select
                required
                value={form.serviceType}
                onChange={(e) => update("serviceType", e.target.value)}
                className="input"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Car make">
              <input
                type="text"
                placeholder="e.g. Nissan"
                value={form.carMake}
                onChange={(e) => update("carMake", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Car model">
              <input
                type="text"
                placeholder="e.g. Patrol"
                value={form.carModel}
                onChange={(e) => update("carModel", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Year">
              <input
                type="text"
                placeholder="e.g. 2019"
                value={form.carYear}
                onChange={(e) => update("carYear", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Plate number">
              <input
                type="text"
                value={form.plateNumber}
                onChange={(e) => update("plateNumber", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Preferred date">
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Preferred time">
              <select
                value={form.preferredTimeSlot}
                onChange={(e) => update("preferredTimeSlot", e.target.value)}
                className="input"
              >
                <option value="any">Any time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </Field>

            <Field label="How will we get the car?" full>
              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  { value: "drop-off", label: "I'll drop it off" },
                  { value: "roadside", label: "It's broken down / roadside" },
                  { value: "pickup-requested", label: "Please arrange pickup" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-sm text-steel">
                    <input
                      type="radio"
                      name="dropOffType"
                      value={opt.value}
                      checked={form.dropOffType === opt.value}
                      onChange={(e) => update("dropOffType", e.target.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Anything else we should know?" full>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="input resize-none"
                placeholder="e.g. noise from the front left wheel when braking"
              />
            </Field>

            {status === "error" && (
              <p className="col-span-full text-sm font-medium text-rust">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="focus-ring col-span-full rounded-sm bg-asphalt px-6 py-3 font-display text-lg font-semibold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send service request"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .input {
          border: 1px solid #C9CDD3;
          background: white;
          padding: 0.6rem 0.75rem;
          font-size: 0.95rem;
          color: #17181B;
          width: 100%;
        }
        .input:focus-visible {
          outline: 3px solid #F5B700;
          outline-offset: 1px;
        }
      `}</style>
    </section>
  );
}

function Field({ label, required, full, children }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-asphalt">
        {label} {required && <span className="text-rust">*</span>}
      </span>
      {children}
    </label>
  );
}
