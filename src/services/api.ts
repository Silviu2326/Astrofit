import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if exists (except for auth routes)
api.interceptors.request.use(
  (config) => {
    // Don't send token for login/register requests
    const isAuthRoute = config.url?.includes('/login') || config.url?.includes('/register');

    if (!isAuthRoute) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors WITHOUT reloading the page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only clear auth data if it's NOT a login/register request
    const isAuthRoute = error.config?.url?.includes('/login') || error.config?.url?.includes('/register');

    if (error.response?.status === 401 && !isAuthRoute) {
      // Token expired or invalid
      console.warn('Authentication error: Token expired or invalid');

      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');

      // DON'T reload the page - let React handle the routing
      // The App.tsx will detect the missing auth and show login page
    }

    // Always reject the error so components can handle it
    return Promise.reject(error);
  }
);

export default api;
