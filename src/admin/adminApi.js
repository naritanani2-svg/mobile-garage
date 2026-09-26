import { API_BASE_URL } from "../config";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

export const adminApi = {
  me: () => request("/admin/me"),
  login: (password) =>
    request("/admin/login", { method: "POST", body: JSON.stringify({ password }) }),
  logout: () => request("/admin/logout", { method: "POST" }),

  listBookings: () => request("/bookings"),
  updateBookingStatus: (id, status) =>
    request(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),

  listMessages: () => request("/contact"),

  listGallery: () => request("/gallery"),
  addGalleryImage: (image) =>
    request("/gallery", { method: "POST", body: JSON.stringify(image) }),
  deleteGalleryImage: (id) => request(`/gallery/${id}`, { method: "DELETE" }),
};
