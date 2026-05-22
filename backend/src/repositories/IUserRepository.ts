export interface UserRecord {
  id: string;
  studentId?: string | null;
  email: string;
  passwordHash: string;
  name: string;
  avatarUrl?: string | null;
  createdAt: Date;
}

export interface IUserRepository {
  findById(id: string): Promise<UserRecord | null>;
  findByEmail(email: string): Promise<UserRecord | null>;
  create(data: Omit<UserRecord, 'createdAt'> & { createdAt?: Date }): Promise<UserRecord>;
  update(id: string, data: Partial<UserRecord>): Promise<UserRecord | null>;
}
