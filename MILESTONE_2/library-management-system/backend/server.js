const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Import new routes
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Add new request routes
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
