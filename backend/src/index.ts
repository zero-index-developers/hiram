import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { formatDate } from '@hiram/shared';

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

const PORT = process.env.PORT || 4000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json());

// Rate Limiter for Auth Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window`
  message: 'Too many authentication attempts, please try again after 15 minutes',
});

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

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
server.listen(PORT, () => {
  console.log(`🚀 Hiram API is running on http://localhost:${PORT}/api/v1`);
});
