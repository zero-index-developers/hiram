import { apiClient } from '../lib/apiClient';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    studentId: string | null;
    email: string;
    name: string;
    avatarUrl: string | null;
    createdAt: string;
  };
}

export const authService = {
  login(data: LoginData) {
    return apiClient.post<AuthResponse>('/auth/sessions', data);
  },

  register(data: RegisterData) {
    return apiClient.post<AuthResponse>('/auth/users', data);
  },

  googleAuth(data: { email: string; name: string; studentId?: string; avatarUrl?: string | null }) {
    return apiClient.post<AuthResponse>('/auth/sessions/google', data);
  },

  getProfile() {
    return apiClient.get<{ user: AuthResponse['user'] }>('/users/me');
  },

  updateProfile(fields: { studentId?: string | null; avatarUrl?: string | null }) {
    return apiClient.patch<{ user: AuthResponse['user'] }>('/users/me', fields);
  },

  async checkEmail(email: string): Promise<boolean> {
    const res = await apiClient.get<{ exists: boolean }>('/auth/email/exists', { params: { email } });
    return res.data.exists;
  },
};
