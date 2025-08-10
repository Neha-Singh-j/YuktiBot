require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Debug: Verify environment variables
console.log('Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '*****' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '*****' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

// Middleware
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      retryWrites: true,
      w: 'majority'
    });
    console.log('MongoDB connected successfully!');
    return true;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error('Please check your MongoDB connection string in the .env file');
    console.error('If using MongoDB Atlas, ensure the username, password, and cluster information are correct');
    console.error('If using local MongoDB, ensure the MongoDB service is running');
    console.warn('Continuing without MongoDB connection...');
    return false;
  }
};

// Import routes
const authRoutes = require('./routes/auth');
const interviewRoutes = require('./routes/interview');
const executeRoutes = require('./routes/execute');
const botRoutes = require('./routes/bot');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/execute', executeRoutes);
app.use('/api/bot', botRoutes);

// Test route
app.get('/', (req, res) => res.json({ 
  status: 'running',
  timestamp: new Date().toISOString() 
}));

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const startServer = () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`);
    console.log('Available routes:');
    console.log('----------------------------------');
    console.log('GET    /');
    console.log('POST   /api/auth/register');
    console.log('POST   /api/auth/login');
    console.log('GET    /api/auth/me (protected)');
    console.log('POST   /api/interview/questions (protected)');
    console.log('GET    /api/interview/questions');
    console.log('POST   /api/execute');
    console.log('POST   /api/bot/chat');
    console.log('GET    /api/bot/intents');
    console.log('POST   /api/bot/intents');
    console.log('POST   /api/bot/reload');
    console.log('----------------------------------');
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

// Try to connect to MongoDB, but start server regardless
connectDB()
  .then((connected) => {
    if (connected) {
      console.log('✅ Server starting with MongoDB connection');
    } else {
      console.log('⚠️  Server starting without MongoDB connection');
    }
    startServer();
  })
  .catch(err => {
    console.warn('Running without MongoDB connection. Some features may not work.');
    startServer();
  });