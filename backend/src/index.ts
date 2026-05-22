import { formatDate } from '@hiram/shared';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import authRouter from './routes/auth';
import uploadRouter from './routes/upload';
import usersRouter from './routes/users';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = Number(process.env.PORT ?? 4000);

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());

// Rate Limiter for Auth Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window`
  message: 'Too many authentication attempts, please try again after 15 minutes',
});

app.use('/api/v1/auth/sessions', authLimiter);
app.use('/api/v1/auth/users', authLimiter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/uploads', uploadRouter);

// Serve uploaded files statically (local storage)
const uploadDirEnv = process.env.UPLOAD_DIR || 'uploads';
const uploadDir = uploadDirEnv.startsWith('/')
  ? uploadDirEnv
  : path.join(__dirname, '../', uploadDirEnv);
app.use('/uploads', express.static(uploadDir));

// Sample Route
app.get('/api/v1/status', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: formatDate(new Date()),
    service: 'Hiram Express API Server',
  });
});

// Socket.io Real-time Chat
io.on('connection', (socket) => {
  console.log(`🔌 Student connected: ${socket.id}`);

  socket.on('join_conversation', (conversationId: string) => {
    socket.join(conversationId);
    console.log(`🗣️ Socket ${socket.id} joined room: ${conversationId}`);
  });

  socket.on('send_message', (data: { conversationId: string; senderId: string; content: string }) => {
    // Broadcast to other users in the room
    socket.to(data.conversationId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Student disconnected: ${socket.id}`);
  });
});

// Start Server
const startServer = (port: number): void => {
  const onListening = (): void => {
    console.log(`🚀 Hiram API is running on http://localhost:${port}/api/v1`);
  };

  const onError = (error: NodeJS.ErrnoException): void => {
    server.removeListener('listening', onListening);

    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
      return;
    }

    throw error;
  };

  server.once('listening', onListening);
  server.once('error', onError);
  server.listen(port);
};

startServer(PORT);
