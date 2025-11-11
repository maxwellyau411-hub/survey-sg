import express from 'express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(3001, () => console.log('Backend running on http://localhost:3000'));
