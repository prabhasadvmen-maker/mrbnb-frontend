/**
 * Base API client configuration and network helper
 */
const API_BASE_URL = '/api/v1';

export const apiClient = {
  async get(endpoint, params = {}) {
    // Simulated network delay for realistic frontend-backend interaction
    await new Promise((resolve) => setTimeout(resolve, 80));
    const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    return { status: 200, ok: true };
  },

  async post(endpoint, body = {}) {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return { status: 201, ok: true, data: body };
  }
};
