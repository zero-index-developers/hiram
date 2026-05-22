import { create } from 'zustand';
import { mockUserProfiles } from '@hiram/shared';

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string | null;
  studentId?: string | null;
  email?: string;
  createdAt?: Date;
}

interface UserStore {
  users: Record<string, UserProfile>;
  setUser: (user: UserProfile) => void;
  getUser: (id: string) => UserProfile | undefined;
  updateAvatar: (userId: string, url: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: Object.fromEntries(
    mockUserProfiles.map((u) => [u.id, { id: u.id, name: u.name, avatarUrl: u.avatarUrl, studentId: u.studentId, email: u.email, createdAt: u.createdAt }])
  ),

  setUser: (user) =>
    set((state) => ({ users: { ...state.users, [user.id]: user } })),

  getUser: (id) => get().users[id],

  updateAvatar: (userId, url) =>
    set((state) => {
      const existing = state.users[userId];
      if (!existing) return state;
      return { users: { ...state.users, [userId]: { ...existing, avatarUrl: url } } };
    }),
}));
