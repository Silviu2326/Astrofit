/**
 * Safely parse JSON from localStorage
 * Handles cases where the value is "undefined", "null", or invalid JSON
 */
export function safeGetJSON<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);

    // Handle cases where localStorage has literal strings "undefined" or "null"
    if (!value || value === 'undefined' || value === 'null') {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    // Clean up invalid data
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Safely set JSON to localStorage
 */
export function safeSetJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Get current user from localStorage
 */
import type { User } from '../features/core/login/mockUsers';

export function getCurrentUser(): User | null {
  return safeGetJSON<User>('currentUser');
}

/**
 * Set current user to localStorage
 */
export function setCurrentUser(user: User): void {
  safeSetJSON('currentUser', user);
}

/**
 * Clear all auth data
 */
export function clearAuthData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated');
}
