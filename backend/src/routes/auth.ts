import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import { loginSchema, registerSchema } from '@hiram/shared';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-hiram-key';

// In-memory fallback database for development if PostgreSQL is not running
interface InMemoryUser {
  id: string;
  studentId: string;
  email: string;
  passwordHash: string;
  name: string;
  course?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
}

const inMemoryUsers: InMemoryUser[] = [
  {
    id: 'mock-1',
    studentId: '2021-00001-MN-0',
    email: 'test@iskolar.pup.edu.ph',
    passwordHash: '$2b$12$K3/qP/lGexf6V7L/kPjSvuFqS32mD9kM0DfeI6L4V6B3aJz0P2U2q', // bcrypt hash of 'password123'
    name: 'Juan Dela Cruz',
    course: 'BSIT',
    avatarUrl: null,
    createdAt: new Date(),
  }
];

// Helper to sign JWT
function signToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// CHECK EMAIL ENDPOINT
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return res.json({ exists: !!user });
  } catch (error) {
    const user = inMemoryUsers.find((u) => u.email === email);
    return res.json({ exists: !!user });
  }
});

// REGISTER ENDPOINT
router.post('/register', async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: result.error.flatten().fieldErrors 
    });
  }

  const { studentId, email, password, name, course } = result.data;

  try {
    // Attempt database query
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { studentId }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Registration failed', 
        details: { 
          email: existingUser.email === email ? ['Email already registered'] : undefined,
          studentId: existingUser.studentId === studentId ? ['Student ID already registered'] : undefined,
        } 
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        studentId,
        email,
        passwordHash,
        name,
        course: course || null,
        avatarUrl: null,
      }
    });

    const token = signToken(user.id);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        studentId: user.studentId,
        email: user.email,
        name: user.name,
        course: user.course,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      }
    });
  } catch (error: any) {
    console.warn('⚠️ Database connection issue or query failure. Falling back to in-memory store.', error.message);
    
    // Fallback implementation
    const existingInMemory = inMemoryUsers.find(
      (u) => u.email === email || u.studentId === studentId
    );

    if (existingInMemory) {
      return res.status(400).json({
        error: 'Registration failed (Mock)',
        details: {
          email: existingInMemory.email === email ? ['Email already registered'] : undefined,
          studentId: existingInMemory.studentId === studentId ? ['Student ID already registered'] : undefined,
        }
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: InMemoryUser = {
      id: `mock-${Date.now()}`,
      studentId,
      email,
      passwordHash,
      name,
      course: course || null,
      avatarUrl: null,
      createdAt: new Date(),
    };

    inMemoryUsers.push(newUser);
    const token = signToken(newUser.id);
    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        studentId: newUser.studentId,
        email: newUser.email,
        name: newUser.name,
        course: newUser.course,
        avatarUrl: newUser.avatarUrl,
        createdAt: newUser.createdAt,
      }
    });
  }
});

// LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: result.error.flatten().fieldErrors 
    });
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user.id);
    return res.json({
      token,
      user: {
        id: user.id,
        studentId: user.studentId,
        email: user.email,
        name: user.name,
        course: user.course,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      }
    });
  } catch (error: any) {
    console.warn('⚠️ Database connection issue or query failure. Falling back to in-memory store.', error.message);

    // Fallback implementation
    const user = inMemoryUsers.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password (Mock)' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password (Mock)' });
    }

    const token = signToken(user.id);
    return res.json({
      token,
      user: {
        id: user.id,
        studentId: user.studentId,
        email: user.email,
        name: user.name,
        course: user.course,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      }
    });
  }
});

// GOOGLE AUTH ENDPOINT (Mock OAuth logic)
router.post('/google', async (req, res) => {
  const { email, name, studentId, avatarUrl } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required for Google Login' });
  }

  // Derive course if not provided, and default student ID if not provided
  const derivedStudentId = studentId || `2021-${Math.floor(10000 + Math.random() * 90000)}-MN-0`;

  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Create user if not exists
      user = await prisma.user.create({
        data: {
          studentId: derivedStudentId,
          email,
          passwordHash: 'google-oauth-placeholder',
          name,
          course: 'BSIT',
          avatarUrl: avatarUrl || null,
        }
      });
    }

    const token = signToken(user.id);
    return res.json({
      token,
      user: {
        id: user.id,
        studentId: user.studentId,
        email: user.email,
        name: user.name,
        course: user.course,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      }
    });
  } catch (error: any) {
    console.warn('⚠️ Database connection issue or query failure. Falling back to in-memory store.', error.message);

    // Fallback implementation
    let user = inMemoryUsers.find((u) => u.email === email);
    if (!user) {
      user = {
        id: `mock-${Date.now()}`,
        studentId: derivedStudentId,
        email,
        passwordHash: 'google-oauth-placeholder',
        name,
        course: 'BSIT',
        avatarUrl: avatarUrl || null,
        createdAt: new Date(),
      };
      inMemoryUsers.push(user);
    }

    const token = signToken(user.id);
    return res.json({
      token,
      user: {
        id: user.id,
        studentId: user.studentId,
        email: user.email,
        name: user.name,
        course: user.course,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      }
    });
  }
});

// GET PROFILE FROM JWT
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    try {
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (user) {
        return res.json({
          user: {
            id: user.id,
            studentId: user.studentId,
            email: user.email,
            name: user.name,
            course: user.course,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
          }
        });
      }
    } catch {
      // ignore db error, let fallback search in-memory
    }

    // Fallback search in-memory
    const inMemoryUser = inMemoryUsers.find((u) => u.id === decoded.userId);
    if (inMemoryUser) {
      return res.json({
        user: {
          id: inMemoryUser.id,
          studentId: inMemoryUser.studentId,
          email: inMemoryUser.email,
          name: inMemoryUser.name,
          course: inMemoryUser.course,
          avatarUrl: inMemoryUser.avatarUrl,
          createdAt: inMemoryUser.createdAt,
        }
      });
    }

    return res.status(404).json({ error: 'User not found' });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
