import { inMemoryUsers, type InMemoryUser } from '../data/store';
import { prisma } from '../prisma';
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

  async search(query: string): Promise<UserRecord[]> {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    try {
      // Try Prisma database first
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: lowerQuery, mode: 'insensitive' } },
            { email: { contains: lowerQuery, mode: 'insensitive' } },
            { studentId: { contains: lowerQuery, mode: 'insensitive' } },
          ],
        },
        take: 10, // Limit to 10 results
      });
      return users;
    } catch {
      // Fallback to in-memory search
      return inMemoryUsers
        .filter((u) =>
          u.name.toLowerCase().includes(lowerQuery) ||
          u.email.toLowerCase().includes(lowerQuery) ||
          (u.studentId?.toLowerCase().includes(lowerQuery) ?? false)
        )
        .slice(0, 10);
    }
  }
}

export const userRepository = new UserRepository();
