const express = require('express');
const app = express(); // Use a different variable name here
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRouter = require('./routes/api');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler.ts');

dotenv.config();

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', apiRouter);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});