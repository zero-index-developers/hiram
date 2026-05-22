import { mockUserProfiles } from '@hiram/shared';

export interface InMemoryUser {
  id: string;
  studentId?: string | null;
  email: string;
  passwordHash: string;
  name: string;
  avatarUrl?: string | null;
  createdAt: Date;
}

const MOCK_PASSWORD_HASH = '$2b$12$K3/qP/lGexf6V7L/kPjSvuFqS32mD9kM0DfeI6L4V6B3aJz0P2U2q';

function buildAllUsers(): InMemoryUser[] {
  const byId = new Map<string, InMemoryUser>();

  const juan: InMemoryUser = {
    id: 'user-juan',
    studentId: '2021-00001-MN-0',
    email: 'juan.delacruz@iskolar.pup.edu.ph',
    passwordHash: MOCK_PASSWORD_HASH,
    name: 'Juan Dela Cruz',
    avatarUrl: null,
    createdAt: new Date(),
  };
  byId.set(juan.id, juan);

  for (const profile of mockUserProfiles) {
    if (!byId.has(profile.id)) {
      byId.set(profile.id, {
        id: profile.id,
        studentId: profile.studentId,
        email: profile.email,
        passwordHash: MOCK_PASSWORD_HASH,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        createdAt: profile.createdAt,
      });
    }
  }

  return Array.from(byId.values());
}

export const inMemoryUsers: InMemoryUser[] = buildAllUsers();
