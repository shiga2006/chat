import express, { Application } from 'express'
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import apiRouter from './routes/api';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database
connectDB();

// Routes
app.use('/api', apiRouter);

// Error handling
app.use(errorHandler);

export default app;