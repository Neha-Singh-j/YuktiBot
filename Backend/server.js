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
    await mongoose.connect(process.env.MONGODB_URI, {
      retryWrites: true,
      w: 'majority'
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// Import routes
const authRoutes = require('./routes/auth');
const interviewRoutes = require('./routes/interview');
const executeRoutes = require('./routes/execute');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/execute', executeRoutes);

// Test route
app.get('/', (req, res) => res.json({ 
  status: 'running',
  timestamp: new Date().toISOString() 
}));

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server only after DB connection
connectDB().then(() => {
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
    console.log('----------------------------------');
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});