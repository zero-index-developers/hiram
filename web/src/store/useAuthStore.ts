import { create } from 'zustand';
import type { User } from '@hiram/shared';
import { useUserStore } from './useUserStore';
import { authService } from '../services/authService';
import { apiClient, setAuthToken } from '../lib/apiClient';

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)![1];
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showAuthModal: boolean;
  authModalTab: 'login' | 'register';

  setAuthModalOpen: (isOpen: boolean, tab?: 'login' | 'register') => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: {
    email: string;
    name: string;
    password?: string;
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
  updateAvatar: (dataUrl: string) => Promise<void>;
  removeAvatar: () => Promise<void>;
  verifyAccount: (studentId: string) => Promise<boolean>;
  unverifyAccount: () => Promise<boolean>;
}

const applyAvatarOverride = (user: any) => {
  if (!user) return null;
  const storedAvatar = localStorage.getItem(`hiram_avatar_${user.id}`);
  if (storedAvatar) {
    return { ...user, avatarUrl: storedAvatar };
  }
  return user;
};

function onAuthSuccess(token: string, user: any) {
  setAuthToken(token);
  const seededUser = applyAvatarOverride(user);
  useUserStore.getState().setUser(seededUser);
  return seededUser;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showAuthModal: false,
  authModalTab: 'login',

  updateAvatar: async (dataUrl: string) => {
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const blob = dataUrlToBlob(dataUrl);
      const formData = new FormData();
      formData.append('file', blob, 'avatar.jpg');

      const uploadRes = await apiClient.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { url } = uploadRes.data;
      const { data } = await authService.updateProfile({ avatarUrl: url });
      set({ user: data.user });
      useUserStore.getState().updateAvatar(currentUser.id, url);
    } catch {
      set({ user: { ...currentUser, avatarUrl: dataUrl } });
    }
  },

  removeAvatar: async () => {
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const { data } = await authService.updateProfile({ avatarUrl: null });
      set({ user: data.user });
      useUserStore.getState().updateAvatar(currentUser.id, null as any);
    } catch {
      set({ user: { ...currentUser, avatarUrl: undefined } });
    }
  },

  setAuthModalOpen: (isOpen, tab = 'login') => {
    set({ showAuthModal: isOpen, authModalTab: tab, error: null });
  },

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.login({ email, password });
      const seededUser = onAuthSuccess(data.token, data.user);
      set({
        token: data.token,
        user: seededUser,
        isAuthenticated: true,
        isLoading: false,
        showAuthModal: false,
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
      const { data } = await authService.register(payload as any);
      const seededUser = onAuthSuccess(data.token, data.user);
      set({
        token: data.token,
        user: seededUser,
        isAuthenticated: true,
        isLoading: false,
        showAuthModal: false,
      });
      return true;
    } catch (err: any) {
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

  verifyAccount: async (studentId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.updateProfile({ studentId });
      const seededUser = applyAvatarOverride(data.user);
      set({ user: seededUser, isLoading: false });
      useUserStore.getState().setUser(seededUser);
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Verification failed. Please try again.';
      set({ error: errMsg, isLoading: false });
      return false;
    }
  },

  unverifyAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.updateProfile({ studentId: null });
      const seededUser = applyAvatarOverride(data.user);
      set({ user: seededUser, isLoading: false });
      useUserStore.getState().setUser(seededUser);
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Failed to unverify account.';
      set({ error: errMsg, isLoading: false });
      return false;
    }
  },

  googleAuth: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.googleAuth(payload);
      const seededUser = onAuthSuccess(data.token, data.user);
      set({
        token: data.token,
        user: seededUser,
        isAuthenticated: true,
        isLoading: false,
        showAuthModal: false,
      });
      return true;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Google Sign In failed.';
      set({ error: errMsg, isLoading: false });
      return false;
    }
  },

  logout: () => {
    setAuthToken(null);
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      showAuthModal: false,
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
      const { data } = await authService.getProfile();
      const seededUser = applyAvatarOverride(data.user);
      set({
        token,
        user: seededUser,
        isAuthenticated: true,
        isLoading: false,
      });
      useUserStore.getState().setUser(seededUser);
    } catch {
      setAuthToken(null);
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },

  checkEmail: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const exists = await authService.checkEmail(email);
      set({ isLoading: false });
      return exists;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Failed to verify email.';
      set({ error: errMsg, isLoading: false });
      return null;
    }
  },
}));
