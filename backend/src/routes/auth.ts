import { Router, Request, Response } from 'express';
import { loginSchema, registerSchema } from '@hiram/shared';
import { authService } from '../services/AuthService';

const router = Router();

// POST /sessions — Login
router.post('/sessions', async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors });
    return;
  }

  try {
    const authResult = await authService.login(result.data.email, result.data.password);
    res.json(authResult);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});

// POST /sessions/google — Google OAuth
router.post('/sessions/google', async (req: Request, res: Response) => {
  const { email, name, studentId, avatarUrl } = req.body;
  if (!email || !name) {
    res.status(400).json({ error: 'Email and Name are required' });
    return;
  }

  try {
    const authResult = await authService.googleAuth({ email, name, studentId, avatarUrl });
    res.json(authResult);
  } catch {
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

// POST /users — Register
router.post('/users', async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const authResult = await authService.register(result.data);
    res.status(201).json(authResult);
  } catch (err: any) {
    const details = err.message === 'Email already registered'
      ? { email: [err.message] }
      : undefined;
    res.status(409).json({ error: err.message, details });
  }
});

// GET /email/exists?email=... — Check email availability
router.get('/email/exists', async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;
  if (!email) {
    res.status(400).json({ error: 'Email query parameter is required' });
    return;
  }
  try {
    const exists = await authService.checkEmailExists(email);
    res.json({ exists });
  } catch {
    res.status(500).json({ error: 'Failed to check email' });
  }
});

export default router;
