const TOKEN_KEY = 'bohdprima_admin_token';
const ADMIN_KEY = 'bohdprima_admin_user';

const ROLE_LABELS = {
  admin: 'Admin',
  collaborator: 'Collaborator',
  'content-editor': 'Content Editor',
  'lead-manager': 'Lead Manager',
};

const PERMISSIONS_BY_ROLE = {
  admin: ['blogs', 'leads'],
  collaborator: ['blogs', 'leads'],
  'content-editor': ['blogs'],
  'lead-manager': ['leads'],
};

function normalizeSessionProfile(profile) {
  const role = profile?.role || 'admin';
  const permissions = Array.isArray(profile?.permissions)
    ? profile.permissions
    : PERMISSIONS_BY_ROLE[role] || [];

  return {
    ...profile,
    role,
    permissions,
  };
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setAdminSession(session) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(normalizeSessionProfile(session.admin || {})));
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
    return normalizeSessionProfile(JSON.parse(rawProfile));
  } catch {
    return null;
  }
}

export function hasAdminPermission(permission) {
  return getAdminProfile()?.permissions?.includes(permission) || false;
}

export function getRoleLabel(role) {
  return ROLE_LABELS[role] || 'User';
}
