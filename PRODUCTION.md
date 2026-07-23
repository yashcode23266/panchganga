# Production Setup

This app is ready to run with Firebase Auth, Firestore rules, and Cloudinary uploads after the steps below are completed.

## 1. Environment Variables

Create `.env` from `.env.example` and fill all Firebase and Cloudinary values.

Do not commit `.env`.

## 2. Firebase Auth Admin User

In Firebase Console:

1. Enable Authentication -> Email/Password.
2. Create the admin user email/password.
3. Copy the user's UID.
4. In Firestore, create:

```text
adminUsers/{uid}
```

With:

```json
{
  "active": true,
  "role": "admin"
}
```

Only users listed in `adminUsers` can access protected admin pages and write/delete content.

## 3. Firestore Rules

Deploy `firestore.rules`.

Rules allow:

- public read for `gallery`, `sponsors`, `socialWork`, `news`, `awards`
- create/update/delete only for authenticated users listed in `adminUsers`
- no public writes

## 4. Firebase App Check

For stronger abuse protection:

1. Enable App Check in Firebase.
2. Register your production domain.
3. Add the reCAPTCHA v3 site key to:

```text
VITE_FIREBASE_APPCHECK_SITE_KEY
```

4. Enforce App Check for Firestore after testing.

## 5. Cloudinary

The current frontend uses an unsigned Cloudinary upload preset. For production:

- Restrict allowed formats to image types.
- Restrict max file size.
- Restrict upload folder to `VITE_CLOUDINARY_FOLDER`.
- Disable transformations that are not needed.

For the strongest setup, use the included Firebase Function:

```text
VITE_USE_SERVER_UPLOAD=true
```

The callable function `uploadOptimizedImage`:

- requires Firebase Auth
- checks `adminUsers/{uid}`
- requires App Check
- resizes images to fit within 1800x1800
- converts uploads to WebP
- uploads to Cloudinary using server-side credentials

Set Cloudinary secrets for Functions:

```powershell
firebase functions:secrets:set CLOUDINARY_CLOUD_NAME
firebase functions:secrets:set CLOUDINARY_API_KEY
firebase functions:secrets:set CLOUDINARY_API_SECRET
```

Then deploy functions:

```powershell
firebase deploy --only functions
```

Cloudinary asset deletion still needs a server-side delete endpoint if you want to delete the physical asset as well as the Firestore record.

## 6. Deploy

Build:

```powershell
npm.cmd run build
```

Deploy Firestore rules and hosting:

```powershell
firebase deploy
```

If using server-side optimized upload, install function dependencies before deployment:

```powershell
cd functions
npm install
cd ..
firebase deploy --only functions,firestore,hosting
```

## 7. Admin Content

Admin routes:

- `/admin/gallery/add`
- `/admin/sponsors/add`
- `/admin/social-work/add`
- `/admin/news/add`
- `/admin/awards/add`

Deleting in admin removes the Firestore record from the website. Cloudinary file deletion requires a signed server-side delete endpoint.
