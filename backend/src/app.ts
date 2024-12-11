import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://to-do-list-stoix-challenge-tphk.vercel.app',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('CORS policy does not allow access from this origin'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'none',
    domain: 'to-do-list-stoix-challenge.onrender.com',
  }
});

app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    console.log(`Método: ${req.method}`);
    console.log(`Cookies:`, req.cookies);
    console.log(`X-CSRF-Token:`, req.headers['x-csrf-token']);
  }
  next();
});

app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    csrfProtection(req, res, next);
  } else {
    next();
  }
});

import taskRoutes from './routes/taskRoutes';
app.use('/api/tasks', taskRoutes);

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const PORT = parseInt(process.env.PORT || "10000", 10);
app.listen(PORT, "0.0.0.0", () => console.log(`Servidor rodando na porta ${PORT}`));
