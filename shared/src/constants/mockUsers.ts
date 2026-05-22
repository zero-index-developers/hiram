import type { User } from '../types/user';

export interface MockGoogleUser {
  name: string;
  email: string;
  studentId: string;
}

export const mockGoogleUsers: MockGoogleUser[] = [
  {
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@iskolar.pup.edu.ph',
    studentId: '2021-00001-MN-0',
  },
  {
    name: 'Maria Clara',
    email: 'maria.clara@iskolar.pup.edu.ph',
    studentId: '2021-00002-MN-0',
  }
];

export const mockUserProfiles: User[] = [
  {
    id: 'user-maria-clara',
    studentId: '2021-00002-MN-0',
    email: 'maria.clara@iskolar.pup.edu.ph',
    name: 'Maria Clara',
    avatarUrl: null,
    createdAt: new Date('2025-08-15'),
  },
  {
    id: 'user-juan',
    studentId: '2021-00001-MN-0',
    email: 'juan.delacruz@iskolar.pup.edu.ph',
    name: 'Juan Dela Cruz',
    avatarUrl: null,
    createdAt: new Date('2025-06-01'),
  },
  {
    id: 'user-isagani',
    studentId: '2021-00003-MN-0',
    email: 'isagani.santos@iskolar.pup.edu.ph',
    name: 'Isagani Santos',
    avatarUrl: null,
    createdAt: new Date('2025-09-20'),
  },
  {
    id: 'user-ariel',
    studentId: '2021-00004-MN-0',
    email: 'ariel.roxas@iskolar.pup.edu.ph',
    name: 'Ariel Roxas',
    avatarUrl: null,
    createdAt: new Date('2025-07-10'),
  },
  {
    id: 'user-patricia',
    studentId: '2021-00005-MN-0',
    email: 'patricia.reyes@iskolar.pup.edu.ph',
    name: 'Patricia Reyes',
    avatarUrl: null,
    createdAt: new Date('2025-10-05'),
  },
];
