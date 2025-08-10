// Simple test server without MongoDB dependency
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => res.json({ 
  status: 'running',
  timestamp: new Date().toISOString() 
}));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nTest server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('----------------------------------');
  console.log('GET    /');
  console.log('----------------------------------');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});