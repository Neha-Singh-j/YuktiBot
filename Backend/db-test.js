require('dotenv').config();
const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI)
// / In both server.js and db-test.js
mongoose.connect(process.env.MONGODB_URI, {
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1); // Exit process on failure
});