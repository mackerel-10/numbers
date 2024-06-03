import express from 'express';
import authRouter from './routes/authRouter';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRouter);

export default app;
