/**
 * Campo Backend API Client
 *
 * Communicates with the Campo Node.js + MongoDB backend API.
 * Configured via VITE_API_URL or defaults to http://localhost:8000/api
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const TOKEN_KEY = 'campo_admin_jwt';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

/**
 * Universal fetch wrapper with automatic JWT authorization header
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // If unauthorized, clear invalid token
    if (response.status === 401 && endpoint !== '/auth/login') {
      clearAuthToken();
    }
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ==========================================
// PUBLIC INQUIRY API
// ==========================================

export async function submitContactInquiry(inquiryData) {
  return request('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiryData),
  });
}

// ==========================================
// ADMIN AUTHENTICATION API
// ==========================================

export async function loginAdmin(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    setAuthToken(data.token);
  }

  return data;
}

export async function getAdminProfile() {
  return request('/auth/me', {
    method: 'GET',
  });
}

export function logoutAdmin() {
  clearAuthToken();
}

// ==========================================
// ADMIN INQUIRY MANAGEMENT API
// ==========================================

export async function getInquiries(params = {}) {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'All') query.append('status', params.status);
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);

  const qs = query.toString();
  return request(`/inquiries${qs ? `?${qs}` : ''}`, {
    method: 'GET',
  });
}

export async function getDashboardStats() {
  return request('/inquiries/stats/summary', {
    method: 'GET',
  });
}

export async function updateInquiryStatus(id, status) {
  return request(`/inquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function addInquiryNote(id, text) {
  return request(`/inquiries/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

export async function deleteInquiry(id) {
  return request(`/inquiries/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// WHATSAPP MESSAGING TEST & CONFIG API
// ==========================================

export async function getWhatsAppConfig() {
  return request('/health-check/whatsapp-config', {
    method: 'GET',
  });
}

export async function testWhatsAppMessage(payload) {
  return request('/health-check/test-whatsapp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
