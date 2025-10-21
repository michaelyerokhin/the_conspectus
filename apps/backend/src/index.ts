
import express from 'express';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test it: http://localhost:${PORT}/health`);
  console.log(`Login: POST http://localhost:${PORT}/api/auth/login`);
});