# Production Setup

This version uses a frontend-only admin password, Firestore for content, and Cloudinary for image uploads.

## 1. Environment Variables

Create `.env` from `.env.example` and fill all Firebase and Cloudinary values.

Admin login is controlled by:

```text
VITE_ADMIN_EMAIL=panchgangawebsite@gmail.com
VITE_ADMIN_PASSWORD=panchganga@1990
```

To change the admin login, edit these two values in `.env`, then rebuild and redeploy.

Important: `VITE_` variables are included in the frontend build. This is simple, but not secure against someone inspecting the website code.

## 2. Firestore Rules

This frontend-only setup needs direct browser writes, so `firestore.rules` allows public read/write for:

- `gallery`
- `sponsors`
- `socialWork`
- `news`
- `awards`

Deploy rules after changes:

```powershell
npx firebase-tools deploy --only firestore:rules --project panchganga-93782
```

## 3. Cloudinary

Uploads use the unsigned Cloudinary preset from the browser:

```text
VITE_USE_SERVER_UPLOAD=false
```

Keep the Cloudinary preset restricted as much as possible:

- image formats only
- max file size
- expected folder only

## 4. Build And Deploy

Build:

```powershell
npm.cmd run build
```

Deploy hosting and rules:

```powershell
npx firebase-tools deploy --only firestore,hosting --project panchganga-93782
```

## 5. Admin Content

Admin routes:

- `/admin/gallery/add`
- `/admin/sponsors/add`
- `/admin/social-work/add`
- `/admin/news/add`
- `/admin/awards/add`

Deleting in admin removes the Firestore record from the website. It does not delete the physical image from Cloudinary.
