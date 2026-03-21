const TOKEN_KEY = 'bohdprima_admin_token';
const ADMIN_KEY = 'bohdprima_admin_user';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setAdminSession(session) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(session.admin || {}));
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getAdminProfile() {
  const rawProfile = localStorage.getItem(ADMIN_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    return JSON.parse(rawProfile);
  } catch {
    return null;
  }
}
