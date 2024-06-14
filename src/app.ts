import express from 'express';
import authRouter from './routes/authRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

export default app;
