import { prisma } from '../prisma';
import { inMemoryUsers, type InMemoryUser } from '../data/store';
import type { IUserRepository, UserRecord } from './IUserRepository';

function toRecord(u: InMemoryUser): UserRecord {
  return { ...u };
}

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<UserRecord | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) return user;
    } catch {
      // fall through
    }
    const found = inMemoryUsers.find((u) => u.id === id);
    return found ? toRecord(found) : null;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) return user;
    } catch {
      // fall through
    }
    const found = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return found ? toRecord(found) : null;
  }

  async create(data: Omit<UserRecord, 'createdAt'> & { createdAt?: Date }): Promise<UserRecord> {
    try {
      const user = await prisma.user.create({
        data: {
          id: data.id,
          studentId: data.studentId,
          email: data.email,
          passwordHash: data.passwordHash,
          name: data.name,
          avatarUrl: data.avatarUrl,
          createdAt: data.createdAt ?? new Date(),
        },
      });
      return user;
    } catch {
      const entry: InMemoryUser = {
        id: data.id,
        studentId: data.studentId ?? null,
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        avatarUrl: data.avatarUrl ?? null,
        createdAt: data.createdAt ?? new Date(),
      };
      inMemoryUsers.push(entry);
      return toRecord(entry);
    }
  }

  async update(id: string, data: Partial<UserRecord>): Promise<UserRecord | null> {
    try {
      const user = await prisma.user.update({ where: { id }, data });
      return user;
    } catch {
      const idx = inMemoryUsers.findIndex((u) => u.id === id);
      if (idx === -1) return null;
      Object.assign(inMemoryUsers[idx], data);
      return toRecord(inMemoryUsers[idx]);
    }
  }
}

export const userRepository = new UserRepository();
