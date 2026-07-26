const ADMIN_SESSION_KEY = 'panchganga_admin_session';

export function getAdminCredentials() {
  return {
    email: import.meta.env.VITE_ADMIN_EMAIL || 'panchgangawebsite@gmail.com',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'panchganga@1990',
  };
}

export function isAdminSessionActive() {
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'active';
}

export function startAdminSession() {
  window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'active');
}

export function endAdminSession() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
