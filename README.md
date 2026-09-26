# Sunflower Auto Garage — Website (single Vercel project)

**كراج سنفلور للسيارات**, Umm Ramool, Dubai. One project, deployed entirely
on Vercel:

- **Frontend:** React + Vite + Tailwind (the public site)
- **API:** Vercel serverless functions in `/api` (no separate backend host)
- **Database:** MongoDB Atlas (via Mongoose)
- **Photo storage:** Vercel Blob (for photos uploaded from the staff dashboard)
- **Staff dashboard:** `/admin` — password-protected, view requests, add/remove gallery photos

Because the API lives in the same project as the frontend, the site calls
`/api/...` directly — no CORS setup, no second server to host or pay for.

## Project structure

```
sunflower-garage-vercel/
├── api/                    Vercel serverless functions
│   ├── garage-info.js
│   ├── health.js
│   ├── bookings/            index.js (GET admin-only / POST public), [id].js (PATCH admin-only)
│   ├── contact/              index.js (GET admin-only / POST public)
│   ├── gallery/                index.js (GET public / POST admin-only), [id].js (DELETE admin-only)
│   └── admin/                   login.js, logout.js, me.js, upload.js
├── lib/                     Shared code used by the API functions (not routes themselves)
│   ├── db.js                 cached MongoDB connection
│   ├── adminAuth.js            signed-cookie session helper
│   └── models/                Booking, ContactMessage, GalleryImage
├── src/                     The React app
│   ├── SiteApp.jsx            the public website
│   ├── App.jsx                  routes "/" → SiteApp, "/admin" → AdminApp
│   ├── admin/                    AdminApp, LoginForm, RequestsPanel, GalleryPanel, adminApi.js
│   ├── components/                 Navbar, Hero, Services, Gallery, BookingForm, LocationMap, Footer…
│   └── config.js                   phone number, WhatsApp link, map coordinates, hours
├── scripts/seed.js          optional: preload the 4 starter photos into MongoDB
└── vercel.json              rewrite so /admin loads the app instead of 404ing
```

## 1. Set up MongoDB Atlas

1. Create a free cluster at mongodb.com/cloud/atlas.
2. **Database Access** → add a database user (username + password).
3. **Network Access** → Allow Access from Anywhere (`0.0.0.0/0`), since
   Vercel functions run from changing IPs.
4. **Connect → Drivers** → copy the connection string, e.g.
   `mongodb+srv://user:password@cluster.mongodb.net/sunflower_garage`.

## 2. Push this project to GitHub

Vercel deploys from a Git repo. Create a new GitHub repo and push this
folder to it.

## 3. Set up Vercel Blob (for the photo uploads)

1. In your Vercel project (after the first deploy, or from the dashboard
   before deploying): **Storage** tab → **Create Database** → **Blob**.
2. Vercel automatically adds a `BLOB_READ_WRITE_TOKEN` environment variable
   to the project — you don't need to create this one yourself.

## 4. Deploy on Vercel

1. **vercel.com** → **Add New Project** → import the GitHub repo.
2. Framework Preset: **Vite** (auto-detected). Leave build command/output
   as detected (`vite build` / `dist`).
3. Before the first deploy (or right after, then redeploy), add these
   **Environment Variables** in Project Settings:
   - `MONGODB_URI` — from step 1
   - `GARAGE_WHATSAPP_NUMBER` = `971551531345`
   - `GARAGE_PHONE_DISPLAY` = `+971 55 153 1345`
   - `ADMIN_PASSWORD` — choose a real password for the staff dashboard
   - `ADMIN_SESSION_SECRET` — any long random string (32+ characters)
4. Deploy. Vercel builds the frontend **and** turns every file in `/api`
   into its own serverless function automatically — nothing else to
   configure.

Your site is now live at `https://<your-project>.vercel.app`, with the
staff dashboard at `https://<your-project>.vercel.app/admin`.

## 5. Load the starter gallery photos (optional)

The 4 photos you originally sent are bundled as a fallback so the gallery
is never empty, but they aren't in MongoDB/Blob storage until you either:

- Upload them yourself from `/admin` → Gallery (simplest — just re-upload
  the same 4 files through the dashboard), or
- Run `npm run seed` locally against your production `MONGODB_URI` — note
  this seed script points at `/images/...` paths (the bundled fallback
  images), not Blob URLs, so it's really just a shortcut for local testing,
  not a substitute for uploading real photos via `/admin`.

## 6. Using the staff dashboard

Go to `/admin` (there's also a small "Staff login" link in the site
footer), log in with `ADMIN_PASSWORD`, and you'll see two tabs:

- **Requests** — every booking submitted through the site, with the
  customer's details, car info, and a dropdown to update status (new →
  contacted → confirmed → in-progress → completed/cancelled). Also shows
  any general contact-form messages.
- **Gallery** — upload a new workshop photo (goes straight to Vercel Blob
  storage, then gets recorded in MongoDB with a caption/category) or
  delete an existing one. The public gallery section on the homepage
  updates immediately since it reads the same data.

Login uses a signed, `HttpOnly` cookie (12-hour session) — there's no
separate user database, just the one shared password in `ADMIN_PASSWORD`.
If you need multiple staff logins with different permissions later, that's
a bigger change (a proper `User` model + per-user auth) — happy to build
that if it becomes necessary.

## 7. Local development

```bash
npm install
npm i -g vercel        # if you don't have the Vercel CLI yet
vercel link            # connect this folder to your Vercel project
vercel env pull .env   # pulls MONGODB_URI, ADMIN_PASSWORD, etc. from Vercel
vercel dev             # runs the frontend AND /api together on one port
```

Open the URL `vercel dev` prints (usually `http://localhost:3000`). Running
plain `vite` (via `npm run dev`) only serves the frontend — API calls will
fail unless you also run `vercel dev` separately (the `vite.config.js`
proxy is already set up to forward `/api` to `http://localhost:3000` for
that case).

## 8. Hours, phone number, and map

All of this lives in `src/config.js`:

- `hours`: currently **"Open 24 hours, every day"**
- `phoneDisplay` / `whatsappNumber`: **+971 55 153 1345**
- `mapsUrl`: your Google Maps share link, used by the "Get directions" button
- `lat` / `lng`: used to render the embedded map on the homepage

I could only get your latest map link's exact coordinates by resolving it,
and `share.google` links block automated access — so the embedded map still
uses the coordinates confirmed earlier for Sunflower Auto Garage
(25.2242667, 55.3668534), while the "Get directions" button now points at
your new link. If that's not the same pin, send the plain
`maps.google.com/?q=...` link (or just the address) and I'll update the
coordinates too.
