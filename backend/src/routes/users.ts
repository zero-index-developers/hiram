import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { authService } from '../services/AuthService';
import { userRepository } from '../repositories/UserRepository';

const router = Router();

// GET /me — Get current user profile
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  const user = await authService.getProfile(req.userId!);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json({ user });
});

// PATCH /me — Update current user (verify, unverify, avatar, etc.)
router.patch('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { studentId, avatarUrl } = req.body;
  const userId = req.userId!;

  if (studentId !== undefined) {
    if (studentId === null) {
      const user = await authService.unverifyAccount(userId);
      if (!user) { res.status(404).json({ error: 'User not found' }); return; }
      res.json({ user });
      return;
    }
    if (typeof studentId === 'string' && studentId.trim()) {
      const user = await authService.verifyAccount(userId, studentId.trim());
      if (!user) { res.status(404).json({ error: 'User not found' }); return; }
      res.json({ user });
      return;
    }
    res.status(400).json({ error: 'Invalid studentId' });
    return;
  }

  if (avatarUrl !== undefined) {
    const user = await authService.updateAvatar(userId, avatarUrl);
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json({ user });
    return;
  }

  res.status(400).json({ error: 'No valid fields to update. Provide studentId or avatarUrl.' });
});

// GET /:id — Get user by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const user = await userRepository.findById(id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const { passwordHash, ...safe } = user;
  res.json(safe);
});

export default router;
