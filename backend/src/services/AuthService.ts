import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/UserRepository';
import type { UserRecord } from '../repositories/IUserRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-hiram-key';

export interface AuthResult {
  token: string;
  user: Omit<UserRecord, 'passwordHash'>;
}

function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

function stripPassword(u: UserRecord): Omit<UserRecord, 'passwordHash'> {
  const { passwordHash, ...rest } = u;
  return rest;
}

export class AuthService {
  async checkEmailExists(email: string): Promise<boolean> {
    const user = await userRepository.findByEmail(email);
    return !!user;
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid email or password');

    return { token: signToken(user.id), user: stripPassword(user) };
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResult> {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await userRepository.create({
      id: `user-${Date.now()}`,
      studentId: null,
      email: data.email,
      passwordHash,
      name: data.name,
      avatarUrl: null,
    });

    return { token: signToken(user.id), user: stripPassword(user) };
  }

  async googleAuth(data: {
    email: string;
    name: string;
    studentId?: string;
    avatarUrl?: string | null;
  }): Promise<AuthResult> {
    let user = await userRepository.findByEmail(data.email);

    if (user) {
      user = await userRepository.update(user.id, {
        name: data.name,
        avatarUrl: data.avatarUrl ?? user.avatarUrl,
      });
    } else {
      user = await userRepository.create({
        id: `mock-${Date.now()}`,
        studentId: data.studentId ?? `2021-${Math.floor(10000 + Math.random() * 90000)}-MN-0`,
        email: data.email,
        passwordHash: 'google-oauth-placeholder',
        name: data.name,
        avatarUrl: data.avatarUrl ?? null,
      });
    }

    if (!user) throw new Error('Authentication failed');
    return { token: signToken(user.id), user: stripPassword(user) };
  }

  async getProfile(userId: string): Promise<Omit<UserRecord, 'passwordHash'> | null> {
    const user = await userRepository.findById(userId);
    return user ? stripPassword(user) : null;
  }

  async verifyAccount(userId: string, studentId: string): Promise<Omit<UserRecord, 'passwordHash'> | null> {
    const user = await userRepository.update(userId, { studentId });
    return user ? stripPassword(user) : null;
  }

  async unverifyAccount(userId: string): Promise<Omit<UserRecord, 'passwordHash'> | null> {
    const user = await userRepository.update(userId, { studentId: null });
    return user ? stripPassword(user) : null;
  }

  async updateAvatar(userId: string, url: string | null): Promise<Omit<UserRecord, 'passwordHash'> | null> {
    const user = await userRepository.update(userId, { avatarUrl: url });
    return user ? stripPassword(user) : null;
  }
}

export const authService = new AuthService();
