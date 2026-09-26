import SiteApp from "./SiteApp.jsx";
import AdminApp from "./admin/AdminApp.jsx";

// No router library needed for two pages: a plain path check is enough.
// The matching Vercel rewrite (see vercel.json) makes sure a direct visit
// to /admin serves this same index.html instead of 404ing.
export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");
  return isAdmin ? <AdminApp /> : <SiteApp />;
}
