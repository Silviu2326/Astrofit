import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  plan: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan?: string;
  role?: string;
  avatar?: string;
  isActive: boolean;
  subscriptionStatus?: string;
  features?: string[];
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
    token: string;
  };
}

class AuthService {
  // Login trainer
  async loginTrainer(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/trainers/login', credentials);

    if (response.data.success && response.data.data.token) {
      // Store token and user info
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.data.user));
    }

    return response.data;
  }

  // Register trainer
  async registerTrainer(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/trainers/register', data);

    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.data.user));
    }

    return response.data;
  }

  // Get current user
  async getMe(): Promise<User> {
    const response = await api.get('/trainers/me');

    if (response.data.success) {
      localStorage.setItem('currentUser', JSON.stringify(response.data.data.trainer));
      return response.data.data.trainer;
    }

    throw new Error('Failed to get user data');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  // Get stored user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check feature access
  async checkFeatureAccess(trainerId: string, featureId: string): Promise<boolean> {
    try {
      const response = await api.get(`/trainers/${trainerId}/features/${featureId}`);
      return response.data.data.hasAccess;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService();
