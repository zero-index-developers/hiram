import { apiClient } from '../lib/apiClient';

interface SearchUserResult {
  id: string;
  name: string;
  email: string;
  studentId?: string | null;
  avatarUrl?: string | null;
}

export async function searchUsers(query: string): Promise<SearchUserResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await apiClient.get('/users/search', {
      params: { q: query },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('User search failed:', error);
    return [];
  }
}
