export interface User {
  id: string;
  studentId?: string | null;
  email: string;
  name: string;
  avatarUrl?: string | null;
  createdAt: Date;
}

export interface StudentProfile {
  id: string;
  studentId?: string | null;
  email: string;
  name: string;
  avatarUrl?: string | null;
  createdAt: Date;
  ratingAverage: number;
  totalRatings: number;
}
