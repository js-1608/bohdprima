const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const API_PUBLIC_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

async function apiRequest(path, options = {}) {
  const { body, headers = {}, token, ...restOptions } = options;
  const requestHeaders = { ...headers };
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined && !isFormData) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: requestHeaders,
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  const rawText = await response.text();
  let payload = null;

  if (rawText) {
    try {
      payload = JSON.parse(rawText);
    } catch {
      payload = { message: rawText };
    }
  }

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getHealthStatus() {
  return apiRequest('/health');
}

export function createAdminUser(credentials, token) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: credentials,
    token,
  });
}

export function loginAdmin(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export function getPublishedBlogs() {
  return apiRequest('/blogs');
}

export function getBlogBySlug(slug) {
  return apiRequest(`/blogs/${slug}`);
}

export function getAdminBlogs(token) {
  return apiRequest('/blogs/admin/all', { token });
}

export function createBlog(payload, token) {
  return apiRequest('/blogs', {
    method: 'POST',
    body: payload,
    token,
  });
}

export function updateBlog(id, payload, token) {
  return apiRequest(`/blogs/${id}`, {
    method: 'PUT',
    body: payload,
    token,
  });
}

export function publishBlog(id, token) {
  return apiRequest(`/blogs/publish/${id}`, {
    method: 'PATCH',
    token,
  });
}

export function deleteBlog(id, token) {
  return apiRequest(`/blogs/${id}`, {
    method: 'DELETE',
    token,
  });
}

export function uploadBlogImage(file, token) {
  const formData = new FormData();
  formData.append('image', file);

  return apiRequest('/blogs/upload-image', {
    method: 'POST',
    body: formData,
    token,
  });
}

export function resolveMediaUrl(path) {
  if (!path) {
    return '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_PUBLIC_BASE_URL}${normalizedPath}`;
}

export function createLead(payload) {
  return apiRequest('/leads', {
    method: 'POST',
    body: payload,
  });
}

export function getLeads(token) {
  return apiRequest('/leads', { token });
}

export function updateLeadStatus(id, payload, token) {
  return apiRequest(`/leads/${id}/status`, {
    method: 'PATCH',
    body: payload,
    token,
  });
}
