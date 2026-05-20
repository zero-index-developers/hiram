import { create } from 'zustand';
import axios from 'axios';
import type { User } from '@hiram/shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showAuthModal: boolean;
  authModalTab: 'login' | 'register';
  
  // Actions
  setAuthModalOpen: (isOpen: boolean, tab?: 'login' | 'register') => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: {
    studentId: string;
    email: string;
    name: string;
    password?: string;
    course?: string;
  }) => Promise<boolean>;
  googleAuth: (payload: {
    email: string;
    name: string;
    studentId?: string;
    avatarUrl?: string;
  }) => Promise<boolean>;
  logout: () => void;
  initAuth: () => Promise<void>;
  clearError: () => void;
  checkEmail: (email: string) => Promise<boolean | null>;
  updateAvatar: (avatarUrl: string) => void;
}

const applyAvatarOverride = (user: any) => {
  if (!user) return null;
  const storedAvatar = localStorage.getItem(`hiram_avatar_${user.id}`);
  if (storedAvatar) {
    return { ...user, avatarUrl: storedAvatar };
  }
  return user;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showAuthModal: false,
  authModalTab: 'login',

  updateAvatar: (avatarUrl: string) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, avatarUrl };
      set({ user: updatedUser });
      localStorage.setItem(`hiram_avatar_${currentUser.id}`, avatarUrl);
    }
  },

  setAuthModalOpen: (isOpen, tab = 'login') => {
    set({ showAuthModal: isOpen, authModalTab: tab, error: null });
  },

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('hiram_token', token);
      set({ 
        token, 
        user: applyAvatarOverride(user), 
        isAuthenticated: true, 
        isLoading: false, 
        showAuthModal: false 
      });
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Login failed. Please try again.';
      set({ error: errMsg, isLoading: false });
      return false;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, payload);
      const { token, user } = response.data;
      
      localStorage.setItem('hiram_token', token);
      set({ 
        token, 
        user: applyAvatarOverride(user), 
        isAuthenticated: true, 
        isLoading: false, 
        showAuthModal: false 
      });
      return true;
    } catch (err: any) {
      // If there are detailed field errors
      const details = err.response?.data?.details;
      let errMsg = err.response?.data?.error || 'Registration failed. Please try again.';
      
      if (details) {
         const fields = Object.keys(details).map(k => `${k}: ${details[k].join(', ')}`);
         errMsg = `${errMsg} (${fields.join('; ')})`;
      }
      
      set({ error: errMsg, isLoading: false });
      return false;
    }
  },

  googleAuth: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/google`, payload);
      const { token, user } = response.data;

      localStorage.setItem('hiram_token', token);
      set({
        token,
        user: applyAvatarOverride(user),
        isAuthenticated: true,
        isLoading: false,
        showAuthModal: false
      });
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Google Sign In failed.';
      set({ error: errMsg, isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('hiram_token');
    set({ 
      token: null, 
      user: null, 
      isAuthenticated: false,
      showAuthModal: false
    });
  },

  initAuth: async () => {
    const token = localStorage.getItem('hiram_token');
    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      set({ 
        token, 
        user: applyAvatarOverride(response.data.user), 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (err) {
      // Token is invalid/expired
      localStorage.removeItem('hiram_token');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },

  checkEmail: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/check-email`, { email });
      set({ isLoading: false });
      return response.data.exists;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Failed to verify email.';
      set({ error: errMsg, isLoading: false });
      return null;
    }
  }
}));
