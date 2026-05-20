export interface MockGoogleUser {
  name: string;
  email: string;
  studentId: string;
  avatarUrl: string;
}

export const mockGoogleUsers: MockGoogleUser[] = [
  {
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@iskolar.pup.edu.ph',
    studentId: '2021-01234-MN-0',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@iskolar.pup.edu.ph',
    studentId: '2021-56789-MN-0',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];
