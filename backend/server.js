import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedInitialAdmin } from './controllers/authController.js';
import authRoutes from './routes/authRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Campo Intelligent Education ERP API',
    database: 'MongoDB Connected',
    time: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start Server and Connect Database
async function startServer() {
  await connectDB();
  await seedInitialAdmin();

  app.listen(PORT, () => {
    console.log(`[Campo Server] Running on http://localhost:${PORT}`);
    console.log(`[Campo Server] Health check available at http://localhost:${PORT}/api/health`);
    console.log(`[Campo Server] Contact endpoint ready at http://localhost:${PORT}/api/inquiries`);
  });
}

startServer();
